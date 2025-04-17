import mongoose ,{Schema} from "mongoose";
import { type } from "os";


const postsSchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    content : {
        type : String,
        required :true,
        trim : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    postImage : [
        {
            type :String
        }
    ]
} , { timestamps : true})

const Posts = mongoose.model("posts" , postsSchema)
export default Posts