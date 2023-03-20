import mongoose from "mongoose";


// telling mogodb how our user data gonna look like 
const UserSchema = new mongoose.Schema(
    {
    // by the assignment
    // name: { type: String , required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String , required: true , unique: true },
    password: { type: String , required: true },
    // profile picture will be an url to link it 
    profileProfile: { type: String },
    // its going to be an array to store id of each user  emty array for no user 
    followers: { type : Array , defaultValue : [] },
    following: { type : Array , defaultValue : [] },
    description: { type: String},
    profilePicture: {type: String },
    
    // by the assginment
    // location: {type : String},
    // DateOfBirth: {type : Date},

    },
    // for when user is being created
    { timestamps : true}
);


// for using it in controller and different routes to get the user data 
export default mongoose.model('User',UserSchema);