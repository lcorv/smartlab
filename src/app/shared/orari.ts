import { Orario } from "./orario";

export const ORARI: Orario[] = [
    { id: 1, aperto: true, giorno: 'Lunedì', apertura_mattino: '09:00', chiusura_mattino: '13:00', apertura_pomeriggio: '15:00', chiusura_pomeriggio: '19:00' },
    { id: 2, aperto: true, giorno: 'Martedì', apertura_mattino: '09:00', chiusura_mattino: null, apertura_pomeriggio: null, chiusura_pomeriggio: '17:00' },
    { id: 3, aperto: true, giorno: 'Mercoledì', apertura_mattino: '09:00', chiusura_mattino: '13:00', apertura_pomeriggio: '15:00', chiusura_pomeriggio: '19:00' },
    { id: 4, aperto: true, giorno: 'Giovedì', apertura_mattino: '09:00', chiusura_mattino: null, apertura_pomeriggio: null, chiusura_pomeriggio: '17:00' },
    { id: 5, aperto: true, giorno: 'Venerdì', apertura_mattino: '09:00', chiusura_mattino: '13:00', apertura_pomeriggio: '15:00', chiusura_pomeriggio: '19:00' },
    { id: 6, aperto: true, giorno: 'Sabato', apertura_mattino: '09:00', chiusura_mattino: '13:00', apertura_pomeriggio: null, chiusura_pomeriggio: null },
    { id: 7, aperto: false, giorno: 'Domenica', apertura_mattino: null, chiusura_mattino: null, apertura_pomeriggio: null, chiusura_pomeriggio: null }
];