import { Orario } from "./orario";

export const ORARI: Orario[] = [
    { aperto: true, giorno_settimana: 'Lunedì', apertura_mattina: '09:00', chiusura_mattina: '13:00', apertura_pomeriggio: '15:00', chiusura_pomeriggio: '19:00' },
    { aperto: true, giorno_settimana: 'Martedì', apertura_mattina: '09:00', chiusura_mattina: null, apertura_pomeriggio: null, chiusura_pomeriggio: '17:00' },
    { aperto: true, giorno_settimana: 'Mercoledì', apertura_mattina: '09:00', chiusura_mattina: '13:00', apertura_pomeriggio: '15:00', chiusura_pomeriggio: '19:00' },
    { aperto: true, giorno_settimana: 'Giovedì', apertura_mattina: '09:00', chiusura_mattina: null, apertura_pomeriggio: null, chiusura_pomeriggio: '17:00' },
    { aperto: true, giorno_settimana: 'Venerdì', apertura_mattina: '09:00', chiusura_mattina: '13:00', apertura_pomeriggio: '15:00', chiusura_pomeriggio: '19:00' },
    { aperto: true, giorno_settimana: 'Sabato', apertura_mattina: '09:00', chiusura_mattina: '13:00', apertura_pomeriggio: null, chiusura_pomeriggio: null },
    { aperto: false, giorno_settimana: 'Domenica', apertura_mattina: null, chiusura_mattina: null, apertura_pomeriggio: null, chiusura_pomeriggio: null }
];