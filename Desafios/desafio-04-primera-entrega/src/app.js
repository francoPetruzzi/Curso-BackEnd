const express = require('express');
const productRouter = require('../routes/product.router.js');
const cartRouter = require('../routes/cart.router.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(port, () => {
    console.log("Server listening in port: " + port);
});
