import 'dotenv/config';
import express from 'express';
const app = express()
const port = process.env.PORT || 5000;
import cors from 'cors';
import mongoose from 'mongoose';
const mongoURI = process.env.MONGO_URI;

//routes
import paymentRouter from './routes/payment.js';
import user from './routes/user.js';
import blog from './routes/blog.js';

//middleware
app.use(cors({
  origin: '*',
  methods: ["POST", "GET",'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'auth-token'],
})); 

app.use(express.json());


//database
mongoose.connect(mongoURI)
    .then((connection) => {
        global.db = connection.connection.db;
        console.log('connected');
    })
    .catch((err) => console.log(err));


    


//routes
app.use("/api", user);
app.use("/api", paymentRouter);
app.use('/api/blog',blog);



  // Start the server only after the database connection is established
  app.get('/', (req, res) => {
    res.send("Hello World");
  });


  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });

