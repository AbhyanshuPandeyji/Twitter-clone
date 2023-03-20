// to create functionality to interact with users

import User from "../models/User.js";
// to delete users tweets as well
import Tweet from "../models/Tweet.js";
import { handleError } from '../error.js'


// get a user - by id because we have one by mongodb
export const getUser = async(req, res, next) => {
    try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
        
    }
    // if anything goes wrong 
    catch (error) {
        next(error);
    }
};

// FUNTIONALITY TO UPDATE USER
export const updateUser = async(req, res, next) => {
    // just an extra layer of security    
    if(req.params.id === req.user.id)
     {   
        try {
            const updatedUser = await User.findByIdAndUpdate(
                // finding the user by id
                req.params.id,
                // then updating its data
                {
                    // sets the given data by user for all
                    $set: req.body,
                },
                {
                    // for setting the new data to be true so it will be saved
                    new: true,
                }
            );

        res.status(200).json(updatedUser);
        } catch(error) {
            next(error);
        }
    } 
    // if every thing fails to match the id given - our profile id
    else{
        return next(handleError(403 , "You can only update your own account"))
    }     
};


// FUNTIONALITY TO DELETE USER
export const deleteUser = async(req, res, next) => {
    // just an extra layer of security    
    if(req.params.id === req.user.id)
     {   
        try {
       
            // to delete the user
            await User.findByIdAndDelete(req.params.id);
            // to delete the users tweets as well
            await Tweet.remove({userId: req.params.id});


        res.status(200).json("User is Deleted");
        } catch (error) {
            next(error);
        }
    } 
    // if every thing fails to match the id given - our profile id
    else{
        return next(handleError(403 , "You can only delete your own account"))
    }     
};


// FUNCTIONALITY TO FOLLOW THE OTHER USER
export const follow = async(req, res, next) => {
    // just an extra layer of security     
        try {
       
        // user to follow  - the user follow profile id
        const user = await User.findById(req.params.id);

        // user going to follow - our profile id
        const currentUser = await User.findById(req.body.id);

        // if user is not being followed already
        if(!user.followers.includes(req.body.id)){
            await user.updateOne({
                // push  the id of the user who want to follow in the followers
                $push:  { followers : req.body.id },
            });

            // to add following user id to our following array
            await currentUser.updateOne({
                $push : { following : req.params.id }
            });

            
        } else {
            // if already following the user
            res.status(403).json("you already following this user");
        }
        res.status(200).json("following the user");
        } catch (error) {
            next(error);
        }
    // if every thing fails to match the id given - our profile id 
};


// FUNCTIONALITY TO UNFOLLOW USER
export const unfollow = async(req, res, next) => {
    // just an extra layer of security     
        try {
       
        // user to follow  - the user follow profile id
        const user = await User.findById(req.params.id);

        // user going to follow - our profile id
        const currentUser = await User.findById(req.body.id);

        // if our user is following the other user
        if(currentUser.following.includes(req.params.id)){
            // to remove following from the other user id we been following
            await user.updateOne({
                // push  the id of the user who want to follow in the followers
                $pull :  { followers : req.body.id },
            });

            // to remove follower from the our user id
            await currentUser.updateOne({
                $pull : { following : req.params.id }
            });

            
        } else {
            // if already following the user
            res.status(403).json("you are not following this user");
        }
        res.status(200).json("unfollowing the user");
        } catch (error) {
            next(error);
        }
    // if every thing fails to match the id given - our profile id 
};