const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { checkCache, invalidateCache } = require('../middleware/cacheMiddleware');

router.get('/', checkCache, productController.getProducts);
router.get('/:id', checkCache, productController.getProductById);

router.post('/', invalidateCache, productController.createProduct);
router.put('/:id', invalidateCache, productController.updateProduct);
router.patch('/:id', invalidateCache, productController.patchProduct);
router.delete('/:id', invalidateCache, productController.deleteProduct);

module.exports = router;
