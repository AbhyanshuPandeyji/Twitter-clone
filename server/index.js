import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";



// the .js is required otherwise it throw an error
import userRoutes from './routes/users.js';
import authRoutes from './routes/auths.js';
import tweetRoutes from './routes/tweets.js';

const app = express();

// initializing the dotenv to read env files
dotenv.config();

// connect to monogdb by mongoose
const connect = () => {
    // for newer version of mongodb after 8  
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO)
    .then(()=> {console.log("connected to the database...")})
    .catch((err) => {
        throw err;
    });
};


// test route
// app.get('/', (req, res)=>{
//     res.send("Hello World");
// })

// so our express server could read json data
app.use(express.json());
// so the express server can read the cookies of the browser - 
// without this our verfy token coulnot able to read the access_token of the browser
app.use(cookieParser());

// to connect routes to our index.js
app.use('/api/users', userRoutes );
app.use('/api/auths', authRoutes );
app.use('/api/tweets', tweetRoutes );

app.listen(8000 , ()=> {
    connect();
    console.log("Listening to Port 8000 ")
})