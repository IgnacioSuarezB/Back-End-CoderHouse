const fs = require("fs");

module.exports = class Container {
  constructor(name, format) {
    this.path = `./${name}`;
    this.format = format;
  }

  async save(obj) {
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      data = JSON.parse(data);
      obj.id = data[data.length - 1].id + 1;
      data.push(obj);
      fs.promises.writeFile(this.path, JSON.stringify(data));
      return obj.id;
    } catch (err) {
      console.log("The file does not exist");
      console.log("Creating new file");
      try {
        fs.promises.writeFile(this.path, JSON.stringify([]));
        console.log("File created");
        this.save(obj);
      } catch (err) {
        err.name = "Server Error";
        throw new Error(err);
      }
    }
  }

  async getById(id) {
    id = parseInt(id);
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      data = JSON.parse(data);
      return data.find((obj) => obj.id === id);
    } catch (err) {
      console.log("error en FileManager", err);
      err.name = "Server Error";
      throw new Error(err);
    }
  }

  async getAll() {
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      return JSON.parse(data);
    } catch (err) {
      err.name = "Server Error";
      throw new Error(err);
    }
  }

  async updateById(id, newdata) {
    id = parseInt(id);
    newdata.id = id;
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      data = JSON.parse(data);
      const index = data.findIndex((obj) => obj.id === id);
      if (index === -1) return "Error ID";
      data[index] = newdata;
      fs.promises.writeFile(this.path, JSON.stringify(data));
      return "OK";
    } catch (err) {
      err.name = "Server Error";
      throw new Error(err);
    }
  }

  async deleteById(id) {
    id = parseInt(id);
    try {
      let data = await fs.promises.readFile(this.path, this.format);
      data = JSON.parse(data);
      const index = data.findIndex((obj) => obj.id === id);
      if (index === -1) return "Error ID";
      data.splice(index, 1);
      fs.promises.writeFile(this.path, JSON.stringify(data));
      return "OK";
    } catch (err) {
      err.name = "Server Error";
      throw new Error(err);
    }
  }

  async deleteAll() {
    try {
      fs.promises.writeFile(this.path, JSON.stringify([]));
    } catch (err) {
      err.name = "Server Error";
      throw new Error(err);
    }
  }
};

//creacion de productos hardcodeados
/*
const containerName = "product.txt";
const containerFormat = "utf-8";
let containerTest = new Container(containerName, containerFormat);

const obj = [
  {
    title: "Lapiz",
    price: 30,
    thumbnail:
      "https://inkgenio.com.ar/4249-large_default/lapiz-staedtler-noris-n-2-hb-2b.jpg",
  },
  {
    title: "Birome",
    price: 50,
    thumbnail:
      "https://www.infoecos.com.ar/wp-content/uploads/2021/09/birome-460x351.jpg",
  },
  {
    title: "Resaltador",
    price: 150,
    thumbnail:
      "https://www.librerialarubrica.com/wp-content/uploads/2020/03/resaltador-faber-castell-46-48-amarillo-maain.jpg",
  },
];

containerTest.save(obj[0]);
setTimeout(() => containerTest.save(obj[1]), 200);
setTimeout(() => containerTest.save(obj[2]), 300);
*/
// Para los test descomentar por secciones y corroborar en el archivo product.txt

//  Primer bloque de test, se crea un nuevo archivo product.txt en caso de no existir
// y se agregan 5 objetos. Aclaración: no se corrobora si existe product.txt con objetos y el
// id siempre empieza en 1. Falta implementación.
/*
containerTest.save(obj);
setTimeout(() => containerTest.save(obj), 200); 
setTimeout(() => containerTest.save(obj), 300);
setTimeout(() => containerTest.save(obj), 400);
setTimeout(() => containerTest.save(obj), 500);
*/

// Se devuelve todos los objetos y se busca el q posee id 2
/*
containerTest
  .getAll(obj)
  .then((allData) => console.log("Todos los Datos ", allData));

containerTest
  .getById(2)
  .then((dato) => console.log("El dato con id 2 es: ", dato));
*/

// Se elimina el Id 3 y se chequea la existencia del mismo
/*
containerTest.deleteById(3);

setTimeout(
  () =>
    containerTest
      .getById(3)
      .then((dato) => console.log("El dato con id 3 es: ", dato)),
  1000
);
*/

// Se elimina todos los archivos
//containerTest.deleteAll();
