import * as jsPDF from 'jsPDF';
import { Document } from './document';
import { ModulePDF } from './module';
import './styles.scss';

let save = document.getElementById('savepdf')

let main = (event) => {
     
    let doc = new Document({
        orientation: 'p',
        unit: 'mm',
        format: 'letter',
    });

    doc.addModule('primer Modulo')
    doc.writeText(` primer modulo .Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nullaDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla`);
    doc.addModule('segundoModulo')
        doc.style('bold').writeText('Segundo modulo');
        doc.writeText('Hola una vez mas ');
        doc.writeText('Hola otra mas')
        .writeText('Hola una vez Hola una vez mas ')
        .writeText('Hola otra mas Hola una vez Hola una vez')
        .writeText('Hola una vez mas  vez mas  vez mas  vez mas ')
        .writeText('Hola otra mas Hola una vez Hola una vez')
        .writeText('Hola una vez mas  vez mas  vez mas  vez mas ')
        .writeText('Hola otra mas')
        .writeText('Hola una vez una vez mas ')
            .writeText('Hola otra mas')
            .writeText('Hola otra mas una vez una vez')
            .writeText('una vez Hola una vez mas ');
    doc.makeColumns(4);
    doc.writeCols([
        'columnas1',
        'columnacolumna columnacolumna columnas2',
        'columnas 3columnas3col umnas3c olumnas3column as3 columnas3c o lumnas3col u mna volumn as3 columnas3c o lumnas3col u mna olumn as3 columnas3c o lumnas3col u mna s3c ol u mnas3',    
        'columnas4',
        'columnas5',
        'columnas6',
        'columnas8'
    ], 3);
    doc.writeCols([
        'columnas1',
        'columnacolumna columnacolumna columnas2',
        'columnas 3columnas3col umnas3c olumnas3column as3 columnas3c o lumnas3col u mna volumn as3 columnas3c o lumnas3col u mna olumn as3 columnas3c o lumnas3col u mna s3c ol u mnas3',    
        'columnas4',
        'columnas5',
        'columnas6',
        'columnas8'
    ], 3).end();
    
    doc.addModule('tercer Modulo')
        doc.style('bold').writeText('tercer Modulo');
        doc.style('bold').writeText('Hola');
        doc.writeText('Hola otra mas');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.writeText('Hola otra mas 2');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.writeText('Hola otra mas 2');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.writeText('Hola otra mas 2');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.writeText('Hola una vez mas32 ');
        doc.writeText('Hola otra mas');
        doc.style('bold').writeText('Hola otra mas 1 bold');
    
    doc.addModule('cuarto Modulo')
        doc.style('bold').writeText('cuarto modulo');
        doc.writeText('Hola otra mas --');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.writeText('Hola una vez mas32 ');
        doc.writeText('Hola otra mas');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.writeText('Hola otra mas');
        doc.writeText('Hola una vez mas32 ');
        doc.style('bold').writeText('Hola otra mas 1 bold');
            // doc.li().writeText('Hola una vez mas32 ');
            // doc.li().writeText('Hola otra mas');
            // doc.li().writeText('Hola otra mas 1 bold');
            doc.writeText('Hola una vez mas32 salto de linea Hola una una vez mas32 salto de linea Hola una una vez mas32 salto de linea Hola una una vez mas32 salto de linea Hola una una vez mas32 salto de linea Hola una vez mas32 ');
        doc.style('bold').writeText('esta es otra lineaHola una vez mas32 ');
        
    doc.addModule('Quinto Modulo')
        doc.style('bold').writeText('Quinto modulo');
        doc.writeText('Hola otra mas');
        doc.style('bold').writeText('Hola otra mas 1 bold');
        doc.li().writeText('Hola otra mas');    
        doc.li().writeText('Hola otra mas');    
        doc.writeText('Hola otra mas');    
        doc.writeText('Hola otra out');    
        doc.li().writeText('Hola otra mas');    
        doc.writeText('Hola otra mas');    
        doc.writeText('Hola otra out');    
        
        doc.li().writeText('Hola otra mas');    
        doc.writeText('Hola otra mas');    
        doc.writeText('Hola otra out');    
        doc.li().writeText('Hola otra mas');    
        doc.writeText('Hola otra mas');    
        doc.writeText('Hola otra out');    
        doc.li().writeText('Hola otra mas');    
        doc.writeText('Hola otra mas');    
        doc.writeText('Hola otra out');    
    doc.save('archivo.pdf');
}

save.addEventListener('click', main);