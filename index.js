import { argv } from 'node:process';

// INGRESO DE ARGUMENTOS
console.log(`-- Inicio de Programa --`);

console.log(argv);

// DECONSTRUCTING: Desestructurar argumentos
let [, , method, operationRaw, article, price, category] = argv;

const match = argv.find((arg) => /^products\/\d+$/.test(arg));
//operation = match ? match.split("/")[0] : operation;
//const id = match ? match.split("/")[1] : null;
console.log(`Match: ${match}`)

// Extraer info si es un path en 'operationRaw' tipo 'products/id'
let operation = operationRaw;
let id = null;
if (operationRaw && operationRaw.includes('/')) {
    const [resource, resourceId] = operationRaw.split('/');
    operation = resource;
    id = parseInt(resourceId);
}

let input = {
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

// Validar entrada
if (!input.method || !input.operation) {
    console.error('❌ Ingresar: npm run start GET products o GET products/id');
    process.exit(1);
}

console.log(`Operación: ${input.operation}`)
if (input.id)
    console.log(`ID: ${input.id}`)

// Función GET: Consultar productos
if (input.method == 'GET') {

    // Consulta todos los productos
    if (input.operation == "products" && !input.id) {
        console.log('1. El argumento es GET - Obteniendo listado de productos...');

        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('❌ Error al consultar lista de productos: ', error));
    }

    // Consulta un producto específico por ID
    if (input.operation == "products" && input.id) {
        console.log(`2. El argumento es GET - Obteniendo el producto con el ID ${input.id}`);

        fetch(`https://fakestoreapi.com/products/${input.id}`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('❌ Error al consultar producto por ID: ', error));
    }
}

// Función POST: Crear un nuevo producto
if (input.method === 'POST' && input.operation === 'products') {
    if (!input.article || !input.price || !input.category) {
        console.error('❌ Faltan datos. Uso correcto: POST products <title> <price> <category>');
        process.exit(1);
    }

    const nuevoProducto = {
        title: input.article,
        price: parseFloat(input.price).toFixed(2),
        category: input.category
    };

    fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
    })
        .then(response => response.json())
        .then(data => {
            console.log('✅ Producto creado exitosamente:');
            console.log(data);
        })
        .catch(err => {
            console.error('❌ Error al crear producto:', err);
        });
}

// Función DELETE: Eliminar producto
if (input.method === 'DELETE' && input.operation === 'products') {
    if (!input.id) {
        console.error('Falta el ID del producto. Uso correcto: DELETE products/<id>');
        process.exit(1);
    }

    fetch(`https://fakestoreapi.com/products/${input.id}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {
            console.log(`✅ Producto con ID ${input.id} eliminado:`);
            console.log(data);
        })
        .catch(err => {
            console.error('❌ Error al eliminar producto:', err);
        });
}
