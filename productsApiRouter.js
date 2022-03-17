const ProductContainer = require("./productsFileManager");
const containerName = "product.txt";
const containerFormat = "utf-8";
let productContainer = new ProductContainer(containerName, containerFormat);

const express = require("express");
const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await productContainer.getAll();
    res.send(allProducts);
  } catch (err) {
    next(err);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await productContainer.getById(+req.params.id);
    if (!product) {
      const err = new Error("The id does not exist");
      err.name = "badId";
      return next(err);
    }
    res.send(product);
  } catch (err) {
    console.log("error en router", err);
    next(err);
  }
});

productsRouter.post("/", async (req, res, next) => {
  try {
    const newId = await productContainer.save(req.body);
    res.send(JSON.stringify({ newId }));
  } catch (err) {
    next(err);
  }
});

productsRouter.put("/:id", async (req, res, next) => {
  try {
    const response = await productContainer.updateById(req.params.id, req.body);
    if (response == "OK") res.status(200).send("OK");
    if (response == "Error ID") {
      const err = new Error("The id does not exist");
      err.name = "badId";
      return next(err);
    }
  } catch (err) {
    next(err);
  }
});

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const response = await productContainer.deleteById(req.params.id);
    if (response == "OK") res.status(200).send("OK");
    if (response == "Error ID") {
      const err = new Error("The id does not exist");
      err.name = "badId";
      return next(err);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = productsRouter;
