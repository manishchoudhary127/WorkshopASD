const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, '../db.json');

async function readData() {
    try {
        let data = await fs.readFile(pathToFile, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
    }
}

async function readFileWithDelay() {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1500);
    });
    let products = await readData();
    return products;
}

async function writeData(data) {
    try {
        await fs.writeFile(pathToFile, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.log(err);
    }
}

async function getAllProducts() {
    let products = await readFileWithDelay();
    return products;
}

async function getProductById(id) {
    let products = await readFileWithDelay();
    let product = products.find((item) => item.id === id);
    return product;
}

async function createProduct(productData) {
    let products = await readData();
    let newId = products.length > 0 ? Math.max(...products.map((item) => item.id)) + 1 : 1;
    let newProduct = { id: newId, ...productData };
    products.push(newProduct);
    await writeData(products);
    return newProduct;
}

async function updateProduct(id, productData, isPartial = false) {
    let products = await readData();
    let index = products.findIndex((item) => item.id === id);
    if (index === -1) {
        return null;
    }
    if (isPartial) {
        products[index] = { ...products[index], ...productData, id };
    } else {
        products[index] = { ...productData, id };
    }
    await writeData(products);
    return products[index];
}

async function deleteProduct(id) {
    let products = await readData();
    let index = products.findIndex((item) => item.id === id);
    if (index === -1) {
        return null;
    }
    let deletedProduct = products.splice(index, 1)[0];
    await writeData(products);
    return deletedProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
