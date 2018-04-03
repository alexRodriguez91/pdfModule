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

export class Document extends setPage {

    private pages: Page[] = [];
    currentPage: Page;
    
    private modules: ModulePDF[] = [];
    currentModule: ModulePDF;

    widthContent;
    private margin: Coord = {h: 10, w: 13};
    private size: Coord;
    private sizePage;
    private typeText = 'text'
    constructor(private pdf: jsPDF, config = null) {
        super(pdf)
        // tamaño de pagina que debe venir en config
        this.sizePage = {w: 216, h: 279}; 
        this.pdf.setFontSize(11);
        this.widthContent = this.sizePage.w - (this.margin.w * 2);
        this.addPage(true);
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
             case 'pargraph':
                // cursor = this.currentModule.writeTextLong(text);
                break;
             default:
                cursor = this.currentModule.writeText(text);
                break;
        }
        if (cursor) {
            if(cursor.h > this.sizePage.h) {
                console.log('    whaaa   .')
                this.currentPage = this.nextPage();
                this.currentModule = this.nextModule();
            } else {
                this.currentPage.setCursor(cursor);
            }
        } else { 
            this.nextPage();
            this.nextModule();
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

    addPage(n = false ) {    
        const temp_Page = new Page({w: this.margin.w ,h:this.margin.h + 10}, this.widthContent);
        temp_Page.header = new Header(this.pdf, {w:270, h: 20});
        this.currentPage = temp_Page;
        this.pdf.setFillColor(231,232,234);
        this.pdf.rect(this.margin.w, (this.margin.h * 2) + 10, this.widthContent, 220, 'F')
        this.pages.push(temp_Page);
        console.log(this.pages)
        if (!n) { this.pdf.addPage(); }
        return temp_Page;
    }

    getPage(pageNum = 0) {
        const found = this.pages.find(page => +page.numPage === +pageNum);
        return !!found ? found : this.currentPage;
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

    nextPage() {
        const n = this.getPage(this.currentPage.numPage + 1);
        return n ? n : this.addPage();
    }

    addModule(title = '', sub = false) {
        const temp_Module = new ModulePDF(this.pdf, this.currentPage, title, sub);
        this.modules.push(temp_Module);
        this.currentModule = temp_Module;
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
        const n = this.getModule(this.currentModule.numModule + 1);
        return n ? n : this.addModule(null, true);
    }

    save(title) {
        this.modules.map((module: ModulePDF) => {
            module.createBox();
        });
        this.pages.map(page => {
            this.pdf.setPage(page.numPage - 1);
            page.header.draw();
        })
        this.currentModule.lastBox();
        this.pdf.save(title);
    }
}
