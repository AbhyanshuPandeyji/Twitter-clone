// this is to verify the users existance and work with it
import  jwt  from "jsonwebtoken";
import { handleError } from "./error.js";


export const verifyToken = ( req , res , next)=>{
    // to read the token of the web browser gotten by the user
    const token = req.cookies.access_token;
    if(!token) return next(handleError(401, "You are not Authorized"));


    // if token found then check if its the right user token if yes then set the inputed to the user
    jwt.verify(token , process.env.JWT , ( error , user )=>{
        // to handle if the token dosent matched
        if(error) return next(createError(403 , "Token is Invalid "));

        req.user = user;
        // to initiate the next step after finishing this task ( to go to next step of the route)
        next();
    });
};