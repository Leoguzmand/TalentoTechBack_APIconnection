import { argv } from 'node:process';

// INGRESO DE ARGUMENTOS
console.log(`Hola Mundo`);

console.log(argv);

// DECONSTRUCTING
let [, , method, operation, article, price, category] = argv;

const match = argv.find((arg) => /^products\/\d+$/.test(arg));
//operation = match ? match.split("/")[0] : operation;
const id = match ? match.split("/")[1] : null;

const input = {
    "method": (method && isNaN(method)) ? method.toUpperCase() : method,
    "operation": (operation && isNaN(operation)) ? operation.toLowerCase() : operation,
    "id": (id) ? parseInt(id) : null,
    "article": article,
    "price": (price && !isNaN(price)) ? parseFloat(price).toFixed(2) : price,
    "category": (category && isNaN(category)) ? category.toLowerCase() : category
};

// FETCH
// fetch('https://fakestoreapi.com/products')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error: ', error));


// Función GET:
if (input.method == 'GET') {

    // Consulta todos los productos
    if (input.operation == "products") {
        console.log('El argumento es GET');

        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error: ', error));
    }

    // Consulta un producto específico por ID
    if (input.method == 'GET' && input.operation == "products") {
        console.log('El argumento es GET - Obteniendo listado de productos...');

        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error: ', error));
    }
}
// Función POST
if (argv[2].toLowerCase() == 'POST'.toLowerCase()) {
    console.log('El argumento es POST ' + argv[3]);
}


