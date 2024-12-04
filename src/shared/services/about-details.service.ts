import { Observable } from "rxjs";

export class AboutDetailsService {
    aboutDetailsArray: any[] = [
        { id: 1, title: 'Mind what', text: 'Mind what no by kept. Celebrated no he decisively thoroughly. Our asked sex point her she seems. New plenty she horses parish design you. Stuff sight equal of my woody. Him children bringing goodness suitable she entirely put far daughter.' },
        { id: 2, title: 'Started joy', text: 'Started several mistake joy say painful removed reached end. State burst think end are its. Arrived off she elderly beloved him affixed noisier yet. An course regard to up he hardly. View four has said does men saw find dear shy. Talent men wicket add garden.' },
        { id: 3, title: 'Unpleasant excellence', text: 'Unpleasant nor diminution excellence apartments imprudence the met new. Draw part them he an to he roof only. Music leave say doors him. Tore bred form if sigh case as do. Staying he no looking if do opinion. Sentiments way understood end partiality and his.' },
        { id: 4, title: 'Ecstatic endeavor', text: 'Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure horrible margaret suitable he followed speedily. Indeed vanity excuse or mr lovers of on. By offer scale an stuff. Blush be sorry no sight. Sang lose of hour then he left find.' },
        { id: 5, title: 'Talking improve', text: 'Oh to talking improve produce in limited offices fifteen an. Wicket branch to answer do we. Place are decay men hours tiled. If or of ye throwing friendly required. Marianne interest in exertion as. Offering my branched confined oh dashwood.' },
    ];

    getAllDetails() {
        return new Observable<any[]>((sub) => {
            setTimeout(() => { // első oparaméter a callback function
                sub.next(this.aboutDetailsArray);
            }, 3000) // második paraméter a timer
        });
        // return this.aboutDetailsArray; // korábbi lekérdezéshez volt szükséges
    }
}