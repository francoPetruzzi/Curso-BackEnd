const express = require('express');
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(port, () => {
    console.log("Server listening in port: " + port);
});
