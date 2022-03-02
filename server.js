const ProductContainer = require("./products");
const containerName = "product.txt";
const containerFormat = "utf-8";
let productContainer = new ProductContainer(containerName, containerFormat);

const express = require("express");
const app = express();

app.get("/productRandom", (req, res) => {
  productContainer
    .getById(Math.floor(Math.random() * 3) + 1)
    .then((product) => {
      console.log(product);
      res.send(product);
    });
});

app.get("/products", (req, res) => {
  productContainer.getAll().then((products) => {
    console.log(products);
    res.send(products);
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!!</h1>");
});

app.listen(3000, () => console.log("Server is running"));
