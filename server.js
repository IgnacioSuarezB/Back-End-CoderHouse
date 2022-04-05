const express = require("express");
const app = express();
const axios = require("axios").default;
const { errorResponder, invalidPathHandler } = require("./error");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

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

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.emit("messages", "Mensaje desde el servidor");
  socket.emit("server:loadMessages", messages);
  socket.on("client:chatMessage", ({ email, message }) => {
    console.log(email, message);
    const timeStamp = getTimeStamp();
    const newMessage = { email, message, timeStamp };
    messages.push(newMessage);
    io.emit("server:newMessage", newMessage);
  });
  socket.on("client:newProduct", async (newProduct) => {
    console.log("Ruta", newProduct, typeof newProduct);
    /* const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const params = new URLSearchParams();
    params.append("title", newProduct.title);
    params.append("price", newProduct.price);
    params.append("thumbnail", newProduct.thumbnail);
    //Guardar Producto
    const id = await axios
      .post("http://localhost:3000/api/products/", params, config)
      .then((res) => {
        return res.data.newId;
      });*/
    const querystring = require("querystring");
    const id = await axios
      .post(
        "http://localhost:3000/api/products/",
        querystring.stringify(newProduct)
      )
      .then((res) => {
        return res.data.newId;
      });
    io.emit("server:newProduct", { ...newProduct, id });
  });
});

server.listen(3000, () => console.log("Server is running"));

//  CONFIGURAR BIEN POSTMAN ✔, CREAR NUEVO METODO ✔ Y VER HANDLEERROR ✔

const messages = [];

const getTimeStamp = () => {
  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
};
