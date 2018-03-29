
interface PageData {
    numPage?: number;
    cursor: {x: number, y: number};
    size: number;
    canReturn: boolean;
}

export class DocPDF {


    sizepageX: number;
    sizepageY: number;
    numPages: number = 0;
    currentPage: number = 0;
    pagePosition: PageData[] = [];
    constructor(private pdf: any) {}

    nextPage() {
        if (this.currentPage < this.numPages) {
            this.currentPage++;
            this.pdf.setPage(this.currentPage);
        }
        return this.getCurrentPosition()
    }

    getCurrentPosition(): PageData {
        console.log(this.pagePosition)
        return this.pagePosition.find(page => page.numPage == this.currentPage);
    }

    prevPage () {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.pdf.setPage(this.currentPage);
        }
        return this.getCurrentPosition();
    }

    addPage(data: PageData): PageData {
        this.pdf.addPage();
        this.pagePosition.push({
            cursor: data.cursor,
            size: data.size,
            canReturn: data.canReturn,
            numPage: this.numPages
        })
        this.numPages += 1;
        this.currentPage = this.numPages
        return this.getCurrentPosition();
    }

    updatePage(page: number = this.currentPage, state: PageData) {
        const i = this.pagePosition.findIndex(st => st.numPage == page);
        if (i) {
            this.pagePosition[i] = state;
        }
        return this.pagePosition[i];
    }

    isLast() {
        return this.currentPage == this.numPages;
    }
  }
