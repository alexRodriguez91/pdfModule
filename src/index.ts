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
    docPDF.writeText(`"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nullaDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla`);
    docPDF.addModule('primer Modulo')
        docPDF.style('bold').writeText('Hola');
        docPDF.writeText('Hola una vez mas ');
        docPDF.writeText('Hola otra mas')
            .writeText('Hola una vez Hola una vez mas ')
            .writeText('Hola otra mas Hola una vez Hola una vez')
            .writeText('Hola una vez mas  vez mas  vez mas  vez mas ')
            .writeText('Hola otra mas')
            .writeText('Hola una vez una vez mas ')
            .writeText('Hola otra mas')
            .writeText('Hola otra mas una vez una vez')
            .writeText('una vez Hola una vez mas ');
    docPDF.startRow(4);
    docPDF.col(2).writeText('Hola otra mas');
    docPDF.endRow();        
    
    docPDF.addModule('Segundo Modulo')
        docPDF.style('bold').writeText('Hola');
        docPDF.style('bold').writeText('Hola');
        docPDF.writeText('Hola otra mas');
        docPDF.style('bold').writeText('Hola otra mas 1 bold');
        docPDF.style('bold').writeText('Hola otra mas 1 bold');
        docPDF.writeText('Hola otra mas 2');
        docPDF.style('bold').writeText('Hola otra mas 1 bold');
        docPDF.style('bold').writeText('Hola otra mas 1 bold');
        docPDF.writeText('Hola una vez mas32 ');
        docPDF.writeText('Hola otra mas');
        docPDF.style('bold').writeText('Hola otra mas 1 bold');
    
    docPDF.addModule('Tercer Modulo')
        docPDF.style('bold').writeText('Hola');
        docPDF.writeText('Hola otra mas');
        docPDF.style('bold').writeText('Hola otra mas 1 bold');
        docPDF.writeText('Hola una vez mas32 ');
        docPDF.writeText('Hola otra mas');
        docPDF.style('bold').writeText('Hola otra mas 1 bold');
        docPDF.writeText('Hola otra mas');
        docPDF.writeText('Hola una vez mas32 ');
        docPDF.style('bold').writeText('Hola otra mas 1 bold');
            // docPDF.li().writeText('Hola una vez mas32 ');
            // docPDF.li().writeText('Hola otra mas');
            // docPDF.li().writeText('Hola otra mas 1 bold');
            docPDF.writeText('Hola una vez mas32 salto de linea Hola una una vez mas32 salto de linea Hola una una vez mas32 salto de linea Hola una una vez mas32 salto de linea Hola una una vez mas32 salto de linea Hola una vez mas32 ');
        docPDF.style('bold').writeText('esta es otra lineaHola una vez mas32 ');
        
    docPDF.addModule('Cuarto Modulo')
        docPDF.style('bold').writeText('Hola');
        docPDF.writeText('Hola otra mas');
        docPDF.style('bold').writeText('Hola otra mas 1 bold');
        docPDF.li().writeText('Hola otra mas');    
        docPDF.li().writeText('Hola otra mas');    
        docPDF.writeText('Hola otra mas');    
        docPDF.writeText('Hola otra out');    
        
    docPDF.save('archivo.pdf');
}

save.addEventListener('click', main);