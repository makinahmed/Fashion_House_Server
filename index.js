const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const port =  process.env.PORT || 5000;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m8c0v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run(){
    try{
        await client.connect();
        const database = client.db('fashion_house')
        const productsCollection = database.collection('products')


       app.get('/products',async (req,res)=>{
        const cursor = productsCollection.find({})
        const result = await cursor.toArray()
        res.json(result)
       })
    }finally{
        // client.close();
    }
}
run().catch(console.dir())



app.get('/',async(req,res)=>{
    console.log("Running Fashion House Server!!");
})


app.listen(port, () => {
    console.log('Fashion house is running on this port : ', port);
})