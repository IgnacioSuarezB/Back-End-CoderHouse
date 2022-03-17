const express = require("express");
const app = express();
const axios = require("axios").default;
const { errorResponder, invalidPathHandler } = require("./error");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/products", async (req, res, next) => {
  try {
    const allProducts = await axios
      .get("http://localhost:3000/api/products")
      .then((res) => res.data);

    res.render("productsPage.ejs", { allProducts });
  } catch (err) {
    next(err);
  }
});

app.use("/api/products", require("./productsApiRouter"));

app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(3000, () => console.log("Server is running"));

//  CONFIGURAR BIEN POSTMAN ✔, CREAR NUEVO METODO ✔ Y VER HANDLEERROR ✔
