const express = require("express");
const app = express();
const { errorResponder, invalidPathHandler } = require("./error");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", require("./productsApiRouter"));

app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(3000, () => console.log("Server is running"));

//  CONFIGURAR BIEN POSTMAN ✔, CREAR NUEVO METODO ✔ Y VER HANDLEERROR ✔
