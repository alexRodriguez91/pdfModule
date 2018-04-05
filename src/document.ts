import { Page } from './Page';
import * as jsPDF from 'jsPDF';
import { ModulePDF } from './module';
import { Header } from './header';

export interface Coord {
    h: number; w: number;
}
export class setPage {
    constructor (private Pdf) {} 
    style(style: string = 'normal', color: string = '#000000') {
        this.Pdf.setTextColor(color);
        this.Pdf.setFontStyle(style);
        return this;
    }
}

export class Document {

    private pages: Page[] = [];
    currentPage: Page;
    
    private modules: ModulePDF[] = [];
    currentModule: ModulePDF;
    pdf;
    widthContent;
    private margin: Coord = {h: 10, w: 13};
    private size: Coord;
    private sizePage;
    private typeText = 'text'
    constructor(cont, config = null) {
        // tamaño de pagina que debe venir en config
        this.pdf = new jsPDF(cont)
        this.sizePage = {w: 216, h: 279}; 
        this.pdf.setFontSize(11);
        this.widthContent = this.sizePage.w - (this.margin.w * 2);
        this.addPage(true);
    }

    style(style: string = 'normal', color: string = '#000000') {
        this.pdf.setTextColor(color);
        this.pdf.setFontStyle(style);
        return this;
    }


    writeText(text) {
        let cursor;
        switch (this.typeText) {
             case 'text':
                cursor = this.currentModule.writeText(text);
                break;
             case 'list':
                cursor = this.currentModule.writeLi(text);
                break;
             case 'columns':
                console.log('ssss', this.numCols, this.span)
                cursor = this.currentModule.writeColumns(text, this.numCols, this.span);
                break;
             default:
                cursor = this.currentModule.writeText(text);
                break;
        }
        if (cursor) {
            if(cursor.h + 20 > this.sizePage.h) {
                console.log('    whaaa  / .')
                this.nextModule(true);
            } else {
                this.currentPage.setCursor(cursor);
            }
        } 

        this.default();
        return this;
    }

    default() {
        this.style();
        this.typeText = 'text';
    }

    li() {
        this.typeText = 'list'; 
        return this;
    }

    addPage(n = false, newModule = false ) {    
        let num = null;
        if (this.pages.length != 0) {
            num = this.pages.reduce((prev, next) => (next.numPage > prev.numPage) ? next : prev)
        }
        if (!n) { 
            this.pdf.addPage();
        }
        const temp_Page = new Page({w: this.margin.w , h:this.margin.h + 10}, this.widthContent, num);
        temp_Page.header = new Header(this.pdf, {w:270, h: 20});
        this.currentPage = temp_Page;
        this.pdf.setFillColor(231, 232, 234);
        this.pdf.rect(this.margin.w, (this.margin.h * 2) + 5, this.widthContent, 235, 'F')
        this.pages.push(temp_Page);
        this.pdf.setPage(this.currentPage.numPage)
        return temp_Page;
    }

    getPage(pageNum = 1) {
        let found = this.pages.find(page => +page.numPage === +pageNum);
        found = found ? found : this.currentPage;
        return found
    }
    
    updatePage(pageNum: Page = this.currentPage) {
        const i = this.pages.findIndex(st => st.numPage == pageNum.numPage);
        if (i) { this.pages[i] = pageNum; }
        return this.pages[i];
    }

    prevPage() {
        const p = this.getPage(this.currentPage.numPage - 1);
        return p ? p : this.currentPage;
    }

    nextPage(module = false) {
        let n = this.getPage(this.currentPage.numPage + 1);
        // es nuevo modulo y no hay nueva pagina
        if ( n.numPage == this.currentPage.numPage) {
            n = this.addPage();
            this.currentPage = n;
        }
        return n
    }

    addModule(title = '', sub = false) {
        if (this.currentModule 
            && this.currentModule.hasOwnProperty('hContent') 
            && this.currentPage.cursor.h + 20 > 270) {
            console.log('cuarto?')
            this.nextPage(true);
            // this.currentPage.numPage -= 1;
        }   
        const num = this.modules.reduce((prev, next) => prev.numModule > next.numModule ? prev : next, {numModule:0})
        const temp_Module = new ModulePDF(this.pdf, this.currentPage, title, num.numModule, sub);
        this.modules.push(temp_Module);
        this.currentModule = temp_Module;
        this.currentPage = this.pages.find(p => p.numPage == this.currentModule.numPage) 
        this.pdf.setPage(this.currentPage.numPage)
        
        return temp_Module;
    }

    
    getModule(moduleNum = 0) {
        const found = this.modules.find(module => +module.numModule === +moduleNum);
        return !!found ? found : this.currentModule;
    }
    
    updateModule(moduleNum: ModulePDF = this.currentModule) {
        const i = this.modules.findIndex(st => st.numModule == moduleNum.numModule);
        if (i) { this.modules[i] = moduleNum; }
        return this.modules[i];
    }

    prevModule() {
        const p = this.getModule(this.currentModule.numModule - 1);
        return p ? p : this.currentModule;
    }

    nextModule(sub = false) {
        let n = this.getModule(this.currentModule.numModule + 1);
        if (n.numModule == this.currentModule.numModule) {
            n = this.addModule('', true);
        }
        this.currentPage = this.pages.find(p => p.numPage == this.currentModule.numPage) 
        this.pdf.setPage(this.currentPage.numPage)
        return n;
        // return n ? n : this.addModule(null, true);
    }

    lastModule() {
        return this.modules.reduce((prev, next) => prev.numModule > next.numModule ? prev : next, {numModule:0} as ModulePDF)   
    }

    // rows
    numCols = 1;
    tmpCursor;
    tmpPgContent;
    span;
    spansize = 0;

    makeColumns(num) {
        this.tmpPgContent = this.currentModule.wContent;
        this.tmpCursor = this.currentPage.cursor;
        this.numCols = num;
    }
    
    
    end() {
        this.numCols = 1;
        this.span = 1;  
        this.currentModule.wContent = this.tmpPgContent;
        
    }
    

    writeCols(arr: Array <string>, span = 1) {
        this.currentPage.cursor.h = this.tmpCursor.h
        this.span = span;
        this.spansize += span;
        if (this.spansize <= this.numCols) {
            arr.map((str) => {
                this.typeText = 'columns';
                this.writeText(str);
            });
        } else {
            // todo: cuando son mas columnas que el ancho
        }
        return this
    }
    // end
    save(title) {
        this.modules.map((mod: ModulePDF) => {
            this.pdf.setPage(mod.numPage);
            mod.createBox();
        });
        this.pages.map(page => {
            this.pdf.setPage(page.numPage - 1);
            page.header.draw();
            this.pdf.setFontSize(10)
            this.pdf.text( 105, 274, page.numPage + '/' + this.pages.length)
        });
        this.currentModule = this.lastModule();
        // console.log(this.pages)        
        // console.log(this.modules)        
        this.pdf.setPage(this.currentModule.numPage);
        this.currentModule.lastBox();
        this.pdf.save(title);
    }
}
