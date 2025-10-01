export enum tipoAvviso{
    chiusura = 'chiusura',
    avviso = 'avviso'
}

export class Avviso {
    id: number;
    tipo: tipoAvviso;
    attivo: boolean;
    titolo: string;
    data_inizio?: Date;
    data_fine?: Date;
    descrizione?: string;
    testo?: string;
    image?: string;
}
