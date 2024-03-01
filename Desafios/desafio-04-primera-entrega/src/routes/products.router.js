const { Router } = require('express');
const ProductManager = require('../classes/ProductManager.js');

const router = Router();
const manager = new ProductManager('./src/models/productos.json');

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await manager.getProducts();
        if (Number(limit)) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await manager.getProductById(pid);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await manager.addProduct(product);
        if (newProduct?.error) {
            return res.status(404).json(newProduct.error);
        }
        res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const modifiedProduct = req.body;
        const modified = await manager.updateProduct(Number(req.params.pid), modifiedProduct);
        if (modified?.error) {
            return res.status(404).json(modified.error);
        }
        res.status(201).json(modified);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const deleted = await manager.deleteProduct(Number(req.params.pid));
        if (deleted?.error) {
            return res.status(404).json(deleted.error);
        }
        res.status(201).json(deleted.message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
