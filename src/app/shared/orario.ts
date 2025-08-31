export class Orario {
    public id: number;
    public giorno: string;
    public aperto: boolean
    public apertura_mattino: string|null;
    public chiusura_mattino: string|null;
    public apertura_pomeriggio: string|null;
    public chiusura_pomeriggio: string|null;
}