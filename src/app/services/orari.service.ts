import { Injectable,makeStateKey,  } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Orario } from '../shared/orario';

const dataKey = makeStateKey<Orario[]>('data');
// Interfaccia per definire un singolo intervallo di orario (apertura e chiusura).
export interface TimeSlot {
  open: string;  // Formato HH:mm
  close: string; // Formato HH:mm
}
// Tipo per rappresentare l'orario settimanale del negozio.
// Le chiavi sono i nomi dei giorni della settimana.
export type WeeklySchedule = {
  [key: string]: TimeSlot[];
};

// Nuovo tipo di dato per il formato JSON fornito dall'utente.
export interface RawDailySchedule {
  giorno_settimana: string;
  aperto: boolean;
  orari: {
    tipo: 'apertura' | 'chiusura';
    periodo: string;
    ora: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class OrariService {

  private apiUrl = environment.api; // Modifica con l'endpoint corretto
  private endpoint = 'orari'
  constructor(private http: HttpClient) { }


  getOrari(): Observable<Orario[]> {
    let url = `${this.apiUrl}${this.endpoint}/`
    return this.http.get<Orario[]>(url);
  }

  updateOrari(data): Observable<any> {
    return this.http.put(`${this.apiUrl}${this.endpoint}/`, data)
  }

  saveOrario(data): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.endpoint}/`, data)
  }

   /**
   * Converte il formato JSON grezzo di un giorno in un formato WeeklySchedule.
   */
  convertRawSchedule(rawData: Orario): TimeSlot[] {
    const timeSlots: TimeSlot[] = [];
    const openTimes = rawData.orari.filter(t => t.tipo === 'apertura').filter((t) => t.ora).map(t => t.ora.substring(0, 5));
    const closeTimes = rawData.orari.filter(t => t.tipo === 'chiusura').filter((t) => t.ora).map(t => t.ora.substring(0, 5));

    if (openTimes.length !== closeTimes.length) {
      console.error("Errore: il numero di orari di apertura e chiusura non corrisponde.");
      return [];
    }

    for (let i = 0; i < openTimes.length; i++) {
      timeSlots.push({
        open: openTimes[i],
        close: closeTimes[i]
      });
    }
    return timeSlots;
  }

  /**
   * Controlla lo stato di apertura del negozio e restituisce l'orario del prossimo evento.
   */
  checkStoreStatus(schedule: WeeklySchedule, currentTime: Date): { status: 'aperto' | 'chiuso'; nextTime: string; class: string } {
    const days = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
    const dayOfWeek = days[currentTime.getDay()];
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    // Orari del giorno corrente
    const todaySchedule = schedule[dayOfWeek] || [];

    // 1. Controlla se il negozio è aperto adesso
    for (const slot of todaySchedule) {
      const [openHours, openMinutes] = slot.open.split(':').map(Number);
      const [closeHours, closeMinutes] = slot.close.split(':').map(Number);
      const openInMinutes = openHours * 60 + openMinutes;
      const closeInMinutes = closeHours * 60 + closeMinutes;

      if (currentMinutes >= openInMinutes && currentMinutes < closeInMinutes) {
        // Il negozio è aperto
        if (closeInMinutes - currentMinutes > 30) {
          return { status: 'aperto', nextTime: `Chiuderà oggi alle ${slot.close}`, class: 'success' };
        }
        else {
          return { status: 'aperto', nextTime: `Chiuderà tra ${closeInMinutes - currentMinutes} minuti.`, class: 'warning' };
        }
      }
    }

    // 2. Se è chiuso, trova il prossimo orario di apertura
    // Cerca prima negli orari rimanenti del giorno corrente
    let nextOpenToday: TimeSlot | undefined;
    for (const slot of todaySchedule) {
      const [openHours, openMinutes] = slot.open.split(':').map(Number);
      const openInMinutes = openHours * 60 + openMinutes;
      if (openInMinutes > currentMinutes) {
        if (!nextOpenToday || openInMinutes < (nextOpenToday.open.split(':').map(Number)[0] * 60 + nextOpenToday.open.split(':').map(Number)[1])) {
          nextOpenToday = slot;
        }
      }
    }

    if (nextOpenToday) {
      return { status: 'chiuso', nextTime: `Aprirà oggi alle ${nextOpenToday.open}`, class: 'danger' };
    }

    // Se non apre più oggi, cerca il prossimo giorno
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (currentTime.getDay() + i) % 7;
      const nextDayName = days[nextDayIndex];
      const nextDaySchedule = schedule[nextDayName] || [];

      if (nextDaySchedule.length > 0) {
        const firstOpenTime = nextDaySchedule[0].open;
        return { status: 'chiuso', nextTime: `Aprirà ${nextDayName.charAt(0).toUpperCase() + nextDayName.slice(1)} alle ${firstOpenTime}`, class: 'danger' };
      }
    }

    // Caso di fallback, se non ci sono orari definiti per la settimana
    return { status: 'chiuso', nextTime: 'Non sono disponibili orari di apertura per la prossima settimana', class: 'danger' };
  }

}
