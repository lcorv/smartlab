export enum tipoOrario{
    aperto = 'apertura',
    chiuso = 'chiusura'
}

export enum periodo{
    mattina = 'mattina',
    chiuso = 'chiuso'
}

export class DettagliOrario {
tipo: tipoOrario;
ora: string;
periodo: periodo;
}

export class Orario {
    public giorno_settimana: string;
    public aperto: boolean
    orari: DettagliOrario[];
    public apertura_mattina: string;
    public chiusura_mattina: string;
    public apertura_pomeriggio: string;
    public chiusura_pomeriggio: string;
}