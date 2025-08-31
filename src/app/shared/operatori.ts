import { Operatore } from "./operatore";

export enum TipoOperatore {
    TELEFONOFISSO = "Telefono fisso",
    TELEFONOMOBILE = "Telefono mobile",
    FORNITORE = "Fornitore di energia",
    CORRIERE = "Corriere",
}

export const OPERATORI: Operatore[] = [
    {
        id: 1,
        nome: "Iliad",
        immagine: "images/operatori/iliad.png",
        descrizione: "",
        descrizione_breve: "operatore di telefonia mobile",
        tipo: TipoOperatore.TELEFONOMOBILE
    },
     {
        id: 2,
        nome: "ho",
        immagine: "images/operatori/ho.png",
        descrizione: "",
        descrizione_breve: "operatore di telefonia mobile",
        tipo: TipoOperatore.TELEFONOMOBILE
    },
    {
        id: 3,
        nome: "Vodafone",
        immagine: "images/operatori/vodafone.png",
        descrizione: "",
        descrizione_breve: "operatore di telefonia mobile",
        tipo: TipoOperatore.TELEFONOMOBILE
    },
    {
        id: 4,
        nome: "Digi",
        immagine: "images/operatori/digi.png",
        descrizione: "",
        descrizione_breve: "operatore di telefonia mobile",
        tipo: TipoOperatore.TELEFONOMOBILE
    },
    {
        id: 5,
        nome: "very mobile",
        immagine: "images/operatori/very.png",
        descrizione: "",
        descrizione_breve: "operatore di telefonia mobile",
        tipo: TipoOperatore.TELEFONOMOBILE
    },
    {
        id: 6,
        nome: "amazon",
        immagine: "images/operatori/amazon.png",
        descrizione: "",
        descrizione_breve: "consegna e ritiro pacchi",
        tipo: TipoOperatore.CORRIERE
    },
    {
        id: 7,
        nome: "BRT",
        immagine: "images/operatori/brt.png",
        descrizione: "",
        descrizione_breve: "consegna e ritiro pacchi",
        tipo: TipoOperatore.CORRIERE
    },
    {
        id: 8,
        nome: "dhl",
        immagine: "images/operatori/dhl.png",
        descrizione: "",
        descrizione_breve: "consegna e ritiro pacchi",
        tipo: TipoOperatore.CORRIERE
    },
    {
        id: 9,
        nome: "InPost",
        immagine: "images/operatori/InPost.png",
        descrizione: "",
        descrizione_breve: "consegna e ritiro pacchi",
        tipo: TipoOperatore.CORRIERE
    },
    {
        id: 10,
        nome: "ups",
        immagine: "images/operatori/ups.png",
        descrizione: "",
        descrizione_breve: "consegna e ritiro pacchi",
        tipo: TipoOperatore.CORRIERE
    },
    {
        id: 11,
        nome: "PuntoPoste",
        immagine: "images/operatori/punto_poste.png",
        descrizione: "",
        descrizione_breve: "consegna e ritiro pacchi",
        tipo: TipoOperatore.CORRIERE
    },
     {
        id: 12,
        nome: "gls",
        immagine: "images/operatori/gls.png",
        descrizione: "",
        descrizione_breve: "corriere",
        tipo: TipoOperatore.CORRIERE
    },
     {
        id: 13,
        nome: "Eolo",
        immagine: "images/operatori/eolo.png",
        descrizione: "",
        descrizione_breve: "operatore di rete fissa",
        tipo: TipoOperatore.TELEFONOFISSO
    },
     {
        id: 14,
        nome: "HERA",
        immagine: "images/operatori/hera.png",
        descrizione: "",
        descrizione_breve: "fornitore di energia",
        tipo: TipoOperatore.FORNITORE
    },
      {
        id: 15,
        nome: "Segno Verde",
        immagine: "images/operatori/segno_verde.png",
        descrizione: "",
        descrizione_breve: "fornitore di energia",
        tipo: TipoOperatore.FORNITORE
    },

]