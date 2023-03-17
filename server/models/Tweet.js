import mongoose from 'mongoose';


const TweetSchema = new mongoose.Schema(
    {
        // Tweeted by could be used for assignment
        userId:{
            type: String,
            required : true,
        },
        description: {
            type: String,
            required: true,
            // no of character to be inputed
            max: 280,
        },
        likes:{
            type: Array,
            defaultValue: [],
        },


        // by the assignment
        // comments: [{
        //     content : {type : String , required: true},
        //     commentedBy : {type: String , required: true},
        // },{timestamps: true}],

        // Retweetby: { type : Array , defaultValue: []}
        // image: { type : String }
        // replies: {type : Array , defaultValue: []},

    },
    {timestamps: true}
);

// Tweet to identify in the database and the Tweet schema is the value we send in the database
export default mongoose.model('Tweet' , TweetSchema)