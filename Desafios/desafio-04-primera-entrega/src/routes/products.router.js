import { Router } from 'express';
import ProductManager from '../classes/ProductManager.js';
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/productos.json");

const router = Router();
let manager = new ProductManager('productos.json');
let products = manager.getProducts();

router.get('/', (req, res) => {
    try {
        const { limit } = req.query;
        if (Number(limit)) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/:pid', (req, res) => {
    try {
        const { pid } = req.params;
        let product = manager.getProductById(pid);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.post('/', async (req, res) => {
    try {
        let product = req.body;
        const newProduct = await manager.addProduct(product);
        if (newProduct?.error) {
            return res.status(404).json(newProduct.error);
        }
        res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        let modifiedProduct = req.body;
        let modified = await manager.updateProduct(Number(req.params.pid), modifiedProduct);
        if (modified?.error) {
            return res.status(404).json(modified.error);
        }
        res.status(201).json(modified);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        let deleted = await manager.deleteProduct(Number(req.params.pid));
        if (deleted?.error) {
            return res.status(404).json(deleted.error);
        }
        res.status(201).json(deleted.message);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

export default router;
