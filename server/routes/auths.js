// to signup our user 
import express from 'express';


import { signup , signin } from "../controllers/auth.js";

// Router() is importing from express fuctionality
const router = express.Router();

// (req,res) is like a middle ware funtion
// req is info from the user side and res is to send it to the browser
router.post('/signup', signup );
router.post('/signin', signin );



// we can create as many routes as possible - router will all have them pack internally
export default router;




