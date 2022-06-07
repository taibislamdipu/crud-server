const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); //built-in express middleware for parsing data in JSON format
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from nodemon!");
});

const products = [
  {
    id: 0,
    productName: "Mango",
    productCode: "Bret",
    image: "Sincere@april.biz",
    unitPrice: 12,
    qty: 7,
    totalPrice: 125,
  },
  {
    id: 1,
    productName: "Lemon",
    productCode: "Bret",
    image: "Sincere@april.biz",
    unitPrice: 12,
    qty: 7,
    totalPrice: 125,
  },
  {
    id: 2,
    productName: "Leanne Graham",
    productCode: "Bret",
    image: "Sincere@april.biz",
    unitPrice: 12,
    qty: 7,
    totalPrice: 125,
  },
  {
    id: 3,
    productName: "Potato",
    productCode: "Bret",
    image: "Sincere@april.biz",
    unitPrice: 12,
    qty: 7,
    totalPrice: 125,
  },
];

app.post("/products", (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length;
  products.push(newProduct);
  console.log("hit post api", req.body);
  res.json(newProduct);
});

// use query parameters
app.get("/products", (req, res) => {
  const search = req.query.search;
  if (search) {
    const searchResults = products.filter((product) =>
      products.productName.toLocaleLowerCase().includes(search)
    );
    res.send(searchResults);
  } else {
    res.send(products);
  }
});

// get specific user
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const user = products[id];
  res.send(user);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
