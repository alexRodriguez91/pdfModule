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
    private margin: Coord = {h: 10, w: 15};
    private size: Coord;

    constructor(private pdf: jsPDF, config = null) {
        super(pdf)
        this.pdf.setFontSize(12);
        this.widthContent = 180;
        this.addPage();
    }

    writeText(text) {
        let cursor = this.currentModule.writeText(text);
        this.currentPage.setCursor(cursor);
        this.style();
    }

    addPage() {
        
        const temp_Page = new Page({w: this.margin.w ,h:this.margin.h + 10}, this.widthContent);
        temp_Page.header= new Header(this.pdf, {w:270, h: 20});
        this.currentPage = temp_Page;
        this.pdf.setFillColor(231,232,234);
        this.pdf.rect(this.margin.w, this.margin.h * 2, this.widthContent, 220, 'F')


        this.pages.push(temp_Page);
    }

    
    getPage(pageNum = 0) {
        const found = this.pages.find(page => +page.numPage === +pageNum);
        return !!found ? found : ({err: 'error'});
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
        return n ? n : this.currentPage;
    }

    addModule(title) {
        const temp_Module = new ModulePDF(this.pdf, this.currentPage, title);
        this.modules.push(temp_Module);
        this.currentModule = temp_Module;
    }

    
    getModule(moduleNum = 0) {
        const found = this.modules.find(module => +module.numModule === +moduleNum);
        return !!found ? found : ({err: 'error'});
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
    nextModule() {
        const n = this.getModule(this.currentModule.numModule + 1);
        return n ? n : this.currentModule;
    }

    save(title) {
        this.modules.map((module: ModulePDF) => {
            module.createBox();
        });
        this.pages.map(page => {
            page.header.draw();
        })
        this.currentModule.lastBox();
        this.pdf.save(title);
    }
}