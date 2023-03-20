// this is for the tweets logic to be done

// importing tweet schema
import Tweet from '../models/Tweet.js'

// error handling
import {handleError} from '../error.js'

// For getting the tweets of out users
import User from "../models/User.js"


// posting a tweet
export const createTweet = async (req, res, next) => { // taking tweet schema and passign the tweet done by user to the schema - description of the tweet

    const newTweet = new Tweet(req.body);
    try { // saving new tweet given by user
        const savedTweet = await newTweet.save();
        res.status(200).json(savedTweet);
    } catch (error) {
        handleError(500, error);
    }

};

// deleting a tweet
export const deleteTweet = async (req, res, next) => {

    try { // finding tweet by its id - await to get the data
        const tweet = await Tweet.findById(req.params.id);
        // if tweet id matched to the id given by user for the tweet then
        if (tweet.userId === req.body.id) {
            await tweet.deleteOne();
            res.status(200).json("Tweet has been Deleted");
        } else {
            handleError(500, error);
        }
    } catch (error) {

        handleError(500, error);
    }

};

// FUNTIONALITY TO LIKE AND DISLIKE A USER
export const LikeOrDislike = async (req, res, next) => {

    try { // finding tweet by its id
        const tweet = await Tweet.findById(req.params.id);

        // if the user is not include in the likes then include it
        if (!tweet.likes.includes(req.body.id)) {
            await tweet.updateOne({
                $push: {
                    likes: req.body.id
                }
            });
            res.status(200).json("Tweet has been liked");
        } else { // if liked already unlike it
            await tweet.updateOne({
                $pull: {
                    likes: req.body.id
                }
            });
            res.status(200).json("Tweet has been disliked");

        }
    } catch (error) {
        handleError(500, error);
    }

};

// FUNTIONALITY TO TO GET ALL TWEETS BY USER AND PEOPLE HE FOLLOW
export const getAllTweets = async (req, res, next) => {

    try { 
        // current user to know who are we following
        const currentUser = await User.findById(req.params.id);
        // Our user tweets
        const userTweets = await Tweet.find({ userId: currentUser._id});
        // all people we following their tweeets based on their id - mappo=ing to all our following users
        const followersTweets =  await Promise.all(
             currentUser.following.map((followerId)=>{
            // map through all and find their all tweets link to their id
            return Tweet.find({ userId: followerId });
            })
        );
        
        // we take our tweets and all all the followers tweets together
        res.status(200).json(userTweets.concat(...followersTweets));
    } catch (error) {
        handleError(500, error);
    }

};


// FUNTIONALITY TO TO GET Al ltweets by user - with like based
export const getUserTweets = async (req, res, next) => {

    try { 
  
        // find all tweets done by our user using the id in tweet body
        const userTweets = await Tweet.find({ userId : req.params.id}).sort( {
            // sort based on latest tweet to oldest
            createdAt: -1
        })
        
        // we take our tweets and all all the followers tweets together
        res.status(200).json(userTweets);
    } catch (error) {
        handleError(500, error);
    }
 
};


// FUNTIONALITY TO TO GET All tweets that been done in the app
export const getExploreTweets = async (req, res, next) => {

    try { 
  
        // find all tweets done by our user using the id in tweet body
        const getExploreTweets  = await Tweet.find({ 
            likes: { $exists: true}
        }).sort( {
            // sort by highest liked tweet is on top
            likes: -1,
        })
        
        // we take our tweets and all all the followers tweets together
        res.status(200).json(getExploreTweets);
    } catch (error) {
        handleError(500, error);
    }
 
};
