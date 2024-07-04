require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 5000;

const mongoURI = process.env.MONGO_URI;

global.db = null;
global.foodItemsCollection = null;
global.foodCategoryCollection = null;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((connection) => {
        global.db = connection.connection.db;
        global.foodItemsCollection = global.db.collection('food_items');
        global.foodCategoryCollection = global.db.collection('food_category');
        console.log('connected');
    })
    .catch((err) => console.log(err));


    
app.use(cors({
    origin: "*",
    methods:["POST","GET"],
    credentials:true
})); 

app.get('/', (req, res) => {
    res.send("Hello sag world");
});

app.use(express.json());

app.use("/api", require("./routes/Createuser"));
app.use("/api", require("./routes/foodItems"));
app.use("/api", require("./routes/paymentValidation"));

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
