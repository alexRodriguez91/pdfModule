import { Coord } from './document'
import { Header } from './header';
export class Page {
    margin: Coord;
    numPage: number = 1;
    
    cursor: Coord;
    lastCursor: Coord; 
    hContent: number;
    wContent: number;
    header: Header;

    constructor(margin: Coord, wContent, page: Page = null) {
        if (page !== null) {
            this.numPage = page.numPage + 1;
            this.cursor = page.cursor;
        } else {
            this.cursor = {w: margin.w , h: 10};
        }
        this.lastCursor = this.cursor;
        // this.hContent = this.cursor.h;
        this.margin = margin;
        this.wContent = wContent;
    }

    getCursor() {
        return this.cursor;
    }           
    // writeText(text) {

    // }

    setCursor(cursor) {
        this.cursor = cursor;
        if( this.cursor.h > this.lastCursor.h) { this.lastCursor = this.cursor }
    }

}