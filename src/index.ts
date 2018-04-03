import * as jsPDF from 'jsPDF';
import { Document } from './document';
import { ModulePDF } from './module';

let save = document.getElementById('savepdf')

let main = (event) => {
    let doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'letter',
        });
    let docPDF = new Document(doc);
    docPDF.addModule('primer Modulo')
    docPDF.style('bold').writeText('Hola');
    docPDF.writeText('Hola otra mas');
    docPDF.writeText('Hola una vez mas ');
    
    docPDF.addModule('Segundo Modulo')
    docPDF.style('bold').writeText('Hola');
    docPDF.writeText('Hola otra mas');
    docPDF.style('bold').writeText('Hola otra mas 1 bold');
    docPDF.style('bold').writeText('Hola otra mas 1 bold');
    docPDF.writeText('Hola otra mas 2');
    docPDF.style('bold').writeText('Hola otra mas 1 bold');
    docPDF.writeText('Hola una vez mas32 ');
    
    docPDF.save('archivo.pdf');
}

save.addEventListener('click', main);