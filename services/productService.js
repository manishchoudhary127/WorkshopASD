const productDatabase = require('../database/productDatabase');

async function fetchProducts() {
    let products = await productDatabase.getAllProducts();
    return products;
}

async function fetchProductById(id) {
    let product = await productDatabase.getProductById(id);
    return product;
}

async function addProduct(productData) {
    let newProduct = await productDatabase.createProduct(productData);
    return newProduct;
}

async function modifyProduct(id, productData) {
    let updatedProduct = await productDatabase.updateProduct(id, productData, false);
    return updatedProduct;
}

async function patchProduct(id, productData) {
    let updatedProduct = await productDatabase.updateProduct(id, productData, true);
    return updatedProduct;
}

async function removeProduct(id) {
    let deletedProduct = await productDatabase.deleteProduct(id);
    return deletedProduct;
}

module.exports = {
    fetchProducts,
    fetchProductById,
    addProduct,
    modifyProduct,
    patchProduct,
    removeProduct
};
