import { DocPDF } from './document';


export class ModulePDF {
    private total: number = 0;
    private bottom: number;
    private top: number;

    _row = false;

    fontsize = 12;
    fontColor = '#000000';

    titleHeight: number = 10;
    title = 'hello title';

    private margin = 20;
    private marginBottom = 10;
    private padContent: number = 5;
    private padLine: number = 5;
    private hContent: number;
    private cursorY = 0;
    private cursorX = 0;

    private widthContent;
    textHeight = 12;
    countlastlines = 0;
    tobig = false;

    constructor(private docpdf: DocPDF, private pdf, top) {
        this.pdf.setFontSize(11);
        this.setTxtStyle('#444444');

        console.log(this.pdf.getFontList())

        this.top = top;
        this.hContent = this.titleHeight;

        this.total = (this.marginBottom) + (this.padContent * 2) + this.titleHeight;
        this.widthContent = 170 - (2 * (this.margin + this.padContent));
        this.addCursor(this.margin + this.padContent, this.top + this.titleHeight + this.padLine);
        this.docpdf.addPage({
            numPage: 0,
            size: 10,
            cursor: {x: 10 + this.padLine, y: this.cursorY} ,
            canReturn: false
        });
        this.getprev();
    }

    getBottom() { return this.bottom; }


    addCursor(dx, dy) {
        if (this.cursorY + dy < this.hContent) {
            this.hContent = this.cursorY + dy;
        }

        this.cursorY += dy;
        this.cursorX += dx;
    }
    createBox(title) {

        if (!this.tobig) {
            // Creando caja de titulo
            this.pdf.setFillColor(0);
            this.pdf.rect(this.margin, this.top, 170, this.titleHeight, 'F')

            // titulo
            this.setTxtStyle('#FFFFFF', 'bold');
            this.pdf.text(title,
                        this.margin + this.padContent,
                        this.top + (this.textHeight / 2)
            );
        }

        // tamaño de modulo
        this.total = (this.hContent - this.titleHeight) + (this.padLine * 3);

        // caja de contenido
        this.pdf.setTextColor('#000000');
        this.pdf.setDrawColor(0);
        this.pdf.rect(this.margin, this.top , 170, this.total);
        this.bottom = this.top + this.total + this.marginBottom;
    }

    setTxtStyle( color = '#000000', style = 'normal') {
        this.pdf.setTextColor(color);
        this.pdf.setFontStyle(style);
        return this;
    }

    writeText(string = '') {
        const movenext = this.hContent + this.padLine;
        if (string.length < this.widthContent / 3) {
            this.hContent += this.padLine;
            if (this.hContent > 277) {
                this.newPage();
            }
            this.addCursor(0, this.padLine)
            this.pdf.text(string, this.cursorX, this.cursorY)

        } else {
            this.writeMultiline(string)
        }
        return this;
    }

    writeMultiline(string) {
        const rg = new RegExp('.{1,' + (Math.round(this.widthContent / 3) - 1) + '}([\S]*\s)?', 'gi')
        string.match(rg).map(str => {
            this.addCursor(0, this.padLine)
            this.pdf.text(string, this.cursorX, this.cursorY)
        });
    }

    writecol(text, col, pos) {

    }

    newPage() {
        this.createBox('title');

        // salvar datos de página
        this.docpdf.updatePage(0, {
            cursor: {x: this.cursorX, y: this.cursorY},
            size: this.hContent,
            canReturn: this._row
        });

        this.tobig = true;
        this.top = 10;
        this.hContent = 10;
        this.cursorY = 10 + this.padLine;

        this.total = (this.marginBottom) + (this.padContent * 2);

        this.docpdf.addPage({
            cursor: {x: this.cursorX, y: this.cursorY},
            size: this.hContent,
            canReturn: this._row
        });

    }

    getprev() {
        const prev = this.docpdf.prevPage();
        this.hContent = prev.size;
        this.cursorY = prev.cursor.y;
        this.cursorX = prev.cursor.x;
    }

    getnext() {
        const prev = this.docpdf.nextPage();
        this.hContent = prev.size;
        this.cursorY = prev.cursor.y;
        this.cursorX = prev.cursor.x;
    }
    checkPage() {

    }

    row() {
        this.cursorY = this.hContent;
        this._row = true;
        return this;
    }

    endrow() {
        this._row = false;
        this.hContent = this.hContent > this.cursorY ? this.hContent : this.cursorY;
    }

    writeSubtitle(string) {
        this.pdf.setFontStyle('bold');

        this.addCursor(0 , this.padLine + 1)
        this.pdf.text(string, this.cursorX, this.cursorY)
        this.setTxtStyle();
    }


}

