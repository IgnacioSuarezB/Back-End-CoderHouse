const socket = io.connect();
socket.on("messages", (data) => console.log(data));

const $form = document.querySelector("#productForm");
const $title = document.querySelector("#title");
const $price = document.querySelector("#price");
const $thumbnail = document.querySelector("#thumbnail");
const $table = document.querySelector("#tableBody");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("client:newProduct", {
    title: $title.value,
    price: $price.value,
    thumbnail: $thumbnail.value,
  });
});

socket.on("server:newProduct", (product) => {
  console.log(product);
  $table.innerHTML += `
    <tr>
    <th scope="row">${product.id}</th>
    <td>${product.title}</td>
    <td>${product.price}</td>
    <td><a href="${product.thumbnail}"> ${product.thumbnail} </a></td>
  </tr>
    `;
});
