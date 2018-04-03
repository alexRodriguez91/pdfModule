import { Coord } from './document'
import { Header } from './header';
export class Page {
    margin: Coord;
    numPage: number = 0;
    
    cursor: Coord;
    lastCursor: Coord; 
    hContent: number;
    wContent: number;
    header: Header;

    constructor(margin: Coord, wContent, page: Page = null) {
        if (page !== null) {
            this.numPage = page.numPage;
            this.cursor = page.cursor;
        } else {
            this.cursor = {w: margin.w , h: 10};
        }
        this.lastCursor = this.cursor;
        this.hContent = this.cursor.h;
        this.margin = margin;
        this.wContent = wContent;
        console.log(this)
    }

    getCursor() {
        return this.cursor;
    }
    // writeText(text) {

    // }

    setCursor(cursor) {
        console.log(cursor)
        this.cursor = cursor;
        console.log(this.cursor)
        if( this.cursor.h > this.lastCursor.h) { this.lastCursor = this.cursor }
    }

}