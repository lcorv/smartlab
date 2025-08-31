import { Icons } from "./icons";
import { Skill } from "./skill";

export const SKILLS: Skill[] = [
    {
        nome: 'Rapidità',
        descrizione: 'Riparazioni effettuate in poche ore.',
        icona: Icons.faClock
    },
    {
        nome: 'Qualità',
        descrizione: 'Usiamo solo ricambi originali o di pari qualità.',
        icona: Icons.faStar
    },
    {
        nome: 'Tranquillità',
        descrizione: '3 mesi di Garanzia su tutti gli interventi.',
        icona: Icons.faCoffee
    },
     {
        nome: 'Onestà',
        descrizione: 'Applichiamo i migliori prezzi sul mercato.',
        icona: Icons.faEuro
    },
    {
        nome: 'Professionalità',
        descrizione: 'Serietà e rigore nel nostro lavoro.',
        icona: Icons.faGem
    },
    {
        nome: 'Disponibilità',
        descrizione: 'Tutte le nostre conoscenze al vostro servizio',
        icona: Icons.faKey
    },
]