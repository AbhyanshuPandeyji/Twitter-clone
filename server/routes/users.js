import express from "express";
import { getUser , updateUser , deleteUser , follow , unfollow } from '../controllers/user.js'
import { verifyToken } from '../verifyToken.js'

// Router() is importing from express fuctionality
const router = express.Router();

// (req,res) is like a middle ware funtion
// req is info from the user side and res is to send it to the browser

// to get one user
router.get('/find/:id', getUser );


// to update our user
router.put('/:id', verifyToken , updateUser );


// Delete the user
router.delete('/:id', verifyToken , deleteUser );


// Follow the users
router.put( '/follow/:id' , verifyToken , follow)


// to Unfollow the user following
router.put('/unfollow/:id' , verifyToken , unfollow )


// we can create as many routes as possible - router will all have them pack internally
export default router;




