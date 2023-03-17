import express from "express";
import { verifyToken } from "../verifyToken.js";
import { createTweet , deleteTweet , LikeOrDislike , getAllTweets, getUserTweets , getExploreTweets } from "../controllers/tweet.js";



// initialize route
const router = express.Router();

// posting a tweet -  on the root so for everyone to see in even if not following  to the tweet section of the app
router.post('/' ,verifyToken , createTweet);


// to delete the tweet - id is required of the tweet
router.delete('/:id' ,verifyToken , deleteTweet );


//Like and Dislike tweet - no verification need 
router.put( "/:id/like" , LikeOrDislike );


// get All timeline tweets
router.get('/timeline/:id' , getAllTweets ); 


// get User Tweets only
router.get("/user/all/:id" , getUserTweets);

// get Explore Tweets
router.get("/explore" , getExploreTweets);

export default router;
