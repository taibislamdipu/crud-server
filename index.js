const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json()); //built-in express middleware for parsing data in JSON format

// user: crudAppDbUser1
// pass: GSlPVhfTYs3uR5mg

const uri =
  "mongodb+srv://crudAppDbUser1:GSlPVhfTYs3uR5mg@cluster0.1o8vjuv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("crudAppDB");
    const productCollection = database.collection("products");
    // create a document to insert

    // POST API
    app.post("/products", async function (req, res) {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);

      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      console.log("added new product", req.body);
      console.log("added product", result);
      res.send(result);
    });

    //GET API
    app.get("/products", async function (req, res) {
      // query for get all products
      const query = {};
      const cursor = await productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);

      // print a message if no documents were found
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// All APi
app.get("/", (req, res) => {
  res.send("Hello from nodemon!");
});

// add product
// app.post("/products", (req, res) => {
//   const newProduct = req.body;
//   newProduct.id = products.length;
//   products.push(newProduct);
//   console.log("hit post api", req.body);
//   res.json(newProduct);
// });

// use query parameters
// app.get("/products", (req, res) => {
//   const search = req.query.search;
//   if (search) {
//     const searchResults = products.filter((product) =>
//       products.productName.toLocaleLowerCase().includes(search)
//     );
//     res.send(searchResults);
//   } else {
//     res.send(products);
//   }
// });

// get specific user
// app.get("/products/:id", (req, res) => {
//   const id = req.params.id;
//   const user = products[id];
//   res.send(user);
// });

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
