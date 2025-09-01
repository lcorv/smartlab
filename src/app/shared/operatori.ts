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
        descrizione_breve: "Operatore di telefonia mobile e rete fissa",
        tipo: TipoOperatore.TELEFONOMOBILE
    },
     {
        id: 2,
        nome: "Ho",
        immagine: "images/operatori/ho.png",
        descrizione: "Ho.mobile è l'operatore virtuale di Vodafone.</br>Vieni in negozio a scoprire le offerte ho.!",
        descrizione_breve: "Operatore di telefonia mobile",
        tipo: TipoOperatore.TELEFONOMOBILE
    },
    {
        id: 3,
        nome: "Vodafone",
        immagine: "images/operatori/vodafone.png",
        descrizione: "",
        descrizione_breve: "operatore di telefonia mobile e rete fissa",
        tipo: TipoOperatore.TELEFONOMOBILE
    },
    {
        id: 4,
        nome: "Digi",
        immagine: "images/operatori/digi.png",
        descrizione: "",
        descrizione_breve: "Operatore di telefonia mobile",
        tipo: TipoOperatore.TELEFONOMOBILE
    },
    {
        id: 5,
        nome: "Very mobile",
        immagine: "images/operatori/very.png",
        descrizione: "",
        descrizione_breve: "operatore di telefonia mobile",
        tipo: TipoOperatore.TELEFONOMOBILE
    },
    {
        id: 6,
        nome: "Amazon",
        immagine: "images/operatori/amazon.png",
        descrizione: "Consegna qui i tuoi resi Amazon effettuati con DHL e UPS.",
        descrizione_breve: "Consegna e ritiro pacchi",
        tipo: TipoOperatore.CORRIERE
    },
    {
        id: 7,
        nome: "BRT",
        immagine: "images/operatori/brt.png",
        descrizione: "Qui puoi consegnare o ritirare le tue spedizioni BRT.",
        descrizione_breve: "Consegna e ritiro pacchi",
        tipo: TipoOperatore.CORRIERE
    },
    {
        id: 8,
        nome: "Dhl",
        immagine: "images/operatori/dhl.png",
        descrizione: "Qui puoi effettuare le tue spedizioni con DHL in base alle tue necessità.</br>Effettuiamo spedizioni nazionali e internazionali con confezionamento e pagamento in negozio. Inoltre ritiriamo resi DHL per conto dei principali e-commerce.",
        descrizione_breve: "Consegna e ritiro pacchi",
        tipo: TipoOperatore.CORRIERE
    },
    {
        id: 9,
        nome: "InPost",
        immagine: "images/operatori/InPost.png",
        descrizione: "",
        descrizione_breve: "Consegna e ritiro pacchi",
        tipo: TipoOperatore.CORRIERE
    },
    {
        id: 10,
        nome: "Ups",
        immagine: "images/operatori/ups.png",
        descrizione: "",
        descrizione_breve: "Consegna e ritiro pacchi",
        tipo: TipoOperatore.CORRIERE
    },
    {
        id: 11,
        nome: "PuntoPoste",
        immagine: "images/operatori/punto_poste.png",
        descrizione: "",
        descrizione_breve: "Consegna e ritiro pacchi",
        tipo: TipoOperatore.CORRIERE
    },
     {
        id: 12,
        nome: "Gls",
        immagine: "images/operatori/gls.png",
        descrizione: "Qui puoi consegnare o ritirare le tue spedizioni GLS",
        descrizione_breve: "Corriere",
        tipo: TipoOperatore.CORRIERE
    },
     {
        id: 13,
        nome: "Eolo",
        immagine: "images/operatori/eolo.png",
        descrizione: "Eolo è uno dei principali fornitori di connettività internet a banda ultra-larga in modalità wireless.</br>Vieni a scoprire le offerte",
        descrizione_breve: "Operatore di rete fissa",
        tipo: TipoOperatore.TELEFONOFISSO
    },
     {
        id: 14,
        nome: "HERA",
        immagine: "images/operatori/hera.png",
        descrizione: "",
        descrizione_breve: "Fornitore di energia",
        tipo: TipoOperatore.FORNITORE
    },
      {
        id: 15,
        nome: "Segno Verde",
        immagine: "images/operatori/segno_verde.png",
        descrizione: "",
        descrizione_breve: "Fornitore di energia",
        tipo: TipoOperatore.FORNITORE
    },

]