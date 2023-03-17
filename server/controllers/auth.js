// functions of the routes in here for the auth
// to setup the model of the data here
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { handleError } from '../error.js';


// function to signup the user in the database
// next is an api middleware to send to next task once this one is done
export const signup = async(req, res, next) => { // our main logic
 
    // just for test
    // console.log(req.body);
    try {

        // for changing the password in different to store in database
        const salt = bcrypt.genSaltSync(10);
        // to change actually the password of the user
        const hash = bcrypt.hashSync(req.body.password , salt);
        // to create user
        const newUser = new User({ ...req.body , password: hash});

        await newUser.save();

        // _id is mognodb created id  
        const token = jwt.sign({id: newUser._id} , process.env.JWT );

        // to hide unnecessary data in - using _doc its a mogodb defined 
        const { password , ...othersData } = newUser._doc;

        // sending back to our browser
        res.cookie('access_token', token , {
            httpOnly: true,
        }).status(200).json(othersData);
        // json othersData (new user) will give us our user in browser window 
    }
    // if anything goes wrong 
    catch (error) {
        next(error);
    }
};



// for signing in the user in
// wew just need username and password for it
export const signin = async(req, res, next) => { // our main logic
 
    // just for test
    // console.log(req.body);
    try {
        
        // find user in database
        const user  = await User.findOne({username: req.body.username });

        // if no user is found - then handleError by error.js file
        if(!user) return next(handleError(404 , "User Not Found"));

        // if user is found - checking if password entered by user in form is matched our password in database
        const isCorrect = await bcrypt.compare( req.body.password , user.password);
        
        // if password is incorrect
        if(!isCorrect) return next(handleError(404 , "Wrong Password"));

        const token = jwt.sign({ id: user._id}, process.env.JWT);

        const { password , ...othersData } = user._doc;

        res.cookie("access_token", token , {
            httpOnly: true,
        }).status(200).json(othersData);
    
    
    }
    // if anything goes wrong 
    catch (error) {
        next(error);
    }
};
