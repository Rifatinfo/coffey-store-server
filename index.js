const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const Swal = require('sweetalert2')
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


// middleware 
app.use(cors());
app.use(express.json());

// coffey
// Nye6mvRS1vEtLipO
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ejjfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const database = client.db("coffeyBD");
    const coffeyCollection = database.collection("coffey");
    
    app.get("/coffey", async(req, res) => {
      const cursor = coffeyCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/coffey', async (req, res) => {
      const newCoffey = req.body;
      console.log(newCoffey);
      const result = await coffeyCollection.insertOne(newCoffey);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('Coffee making server is running')
})

app.listen(port, () => {
    console.log(`Coffey Server is running on port : ${port}`);
})
