import { argv } from 'node:process';

console.log(`Hola Mundo`);

console.log(argv);


// FETCH
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => console.log(data));


// Función GET
if (argv[2].toLowerCase() == 'GET'.toLowerCase()) {
    console.log('El argumento es GET');
}

// Función POST
if (argv[2].toLowerCase() == 'POST'.toLowerCase()) {
    console.log('El argumento es POST ' + argv[3]);
}


