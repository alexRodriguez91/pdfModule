

export class Box {
    height: number;
    margin: number;
    padding: number;
    hContent: number;
    htitle: number;
    title:string;
    page: number;
    constructor(private pdf: any, box: Box) {}
    
    getPosition() {
        return ({
            margin: this.margin,
            hcontent: this.hContent,
            page: this.page
        });
    }

}