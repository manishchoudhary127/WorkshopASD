const productService = require('../services/productService');

async function getProducts(req, res) {
    try {
        let products = await productService.fetchProducts();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

async function getProductById(req, res) {
    try {
        let { id } = req.params;
        id = Number(id);
        let product = await productService.fetchProductById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
}

async function createProduct(req, res) {
    try {
        let newProduct = await productService.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create product' });
    }
}

async function updateProduct(req, res) {
    try {
        let { id } = req.params;
        id = Number(id);
        let updatedProduct = await productService.modifyProduct(id, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update product' });
    }
}

async function patchProduct(req, res) {
    try {
        let { id } = req.params;
        id = Number(id);
        let updatedProduct = await productService.patchProduct(id, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to patch product' });
    }
}

async function deleteProduct(req, res) {
    try {
        let { id } = req.params;
        id = Number(id);
        let deletedProduct = await productService.removeProduct(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to delete product' });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
