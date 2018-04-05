import { Document, Coord, setPage } from './document';
import { Page } from './Page';
import * as jsPDF from 'jsPDF';

export class ModulePDF {
    numModule = 1;
    numPage;
    subModule = false;
    title;
    private top: number;
    private cursor: Coord = {h:0, w:0};
    height;
    hContent = 0;
    wContent = 0;
    config = {
        
        textHeight : 12,
        titleHeight : 10,
        margin: {h: 15, w: 10},
        padding: {h: 5, w: 10},
        paddLine: 4
    }


    constructor(private pdf: jsPDF, page: Page, title, num, sub= false) {
        this.title = title;
        this.top = this.config.margin.h;
        this.cursor.w = page.cursor.w;
        this.numPage = page.numPage;
        if (page.cursor.h + 40 > 270) {
            this.cursor.h = this.config.titleHeight + this.config.margin.h + this.config.padding.h
        } else {
            this.top += page.cursor.h;
            this.cursor = page.getCursor();
            this.cursor.h += this.config.titleHeight + this.config.margin.h + this.config.padding.h
        }
        // this.cursor.w
        this.wContent = page.wContent;
        this.config.margin.w = page.margin.w;
        this.subModule = sub;
        this.numModule = num + 1;
    }

    createBox() {

        // Creando caja de titulo
        this.pdf.setFillColor(255, 255, 255);
        this.pdf.rect(this.config.margin.w, this.top, this.wContent , this.config.titleHeight, 'F')

        this.pdf.setFillColor(0);
        this.pdf.rect(this.config.margin.w, this.top + this.config.titleHeight, this.wContent, 0.5, 'F')

        // titulo
        this.setTxtStyle('#333', 14);
        this.pdf.text(this.title,
                    this.config.margin.w + Math.round(this.config.padding.w / 2),
                    this.top + Math.round(this.config.textHeight / 2)
        );
    

        // tamaño de modulo
        this.height = (this.hContent - this.config.titleHeight);

        // caja de contenido
        this.pdf.setTextColor('#000000');
        this.pdf.setFillColor(255);
        this.pdf.rect(this.config.margin.w, this.top + this.height + this.config.paddLine, this.wContent    , this.config.margin.h, 'F');
        // this.bottom = this.top + this.height + this.marginBottom;
    }

    lastBox() {
        let height = this.top + this.height + this.config.paddLine;
        let bottom = 270 - height;
        this.pdf.setFillColor(255, 255, 255);
        this.pdf.rect(this.config.margin.w, height, this.wContent, bottom, 'F');
        
    }

    setTxtStyle( color = '#000000',  size = 11, style = 'normal') {
        this.pdf.setTextColor(color);
        this.pdf.setFontStyle(style);
        this.pdf.setFontSize(size);
        return this;
    }

    setCursor(cursor: Coord) {
        this.cursor = cursor;
        const h =  this.cursor.h + this.config.titleHeight - this.top;
        if (h > this.hContent)  { this.hContent = h; }
        return this.cursor;
    }

    writeText(text) {
        // logica de escritura, si es grande dibuja varias lineas
        
        return this.writeLine(text);
    }

    writeLi(text) { 
        this.setTxtStyle('#3377DD');
        let line = this.writeLine( '-  '+ text);
        return this.setCursor({w: line.w, h: ( line.h + 2)})
        
    }


    writeLine(text, inline = false) {
        let factor = 1
        let t: Array <any> = text.split(' ');
        let text_tmp = '';
        let textline = text_tmp;
        for (let i = 0; i < t.length; i++) {
            if ((this.pdf.getStringUnitWidth(textline + t[i]) * 11 / 2.81) >= (this.wContent - (this.config.padding.w * 2))) {
                text_tmp += '\n';
                factor += 1;
                textline = '';
            }
            text_tmp += t[i] + ' ';
            textline += t[i] + ' ';
        }
        this.pdf.text(this.cursor.w + this.config.padding.w, this.cursor.h, text_tmp);
        return this.setCursor({w: this.cursor.w, h: (this.cursor.h + (this.config.paddLine * factor))})
    }

    writeColumns(text, cols, span) {
        const tmp = this.wContent
        console.log('col,pad', cols, span, this.wContent)
        this.wContent = Math.round((this.wContent / cols) * span) ;
        console.log('A__', this.wContent);
        const ret = this.writeText(text);
        this.wContent = tmp;
        return ret;
        
    }

    resetwhith(pg: Page) {
        this.wContent = pg.wContent;
        // this.setCursor({w: this.cursor.w, h: this.cursor.h + this.config.paddLine})
    }

}

