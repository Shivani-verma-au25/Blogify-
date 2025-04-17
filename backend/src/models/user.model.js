import mongoose ,{Schema} from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    fullName : {
        type : String,
        required : true,
        trim : true,
        lowercase : true ,
    },
    email : {
        type : String,
        required : true,
        trim : true,
    },
    password : {
        type : String,
        required : true, 
    },
    refreshToken : {
        type : String
    }

},{timestamps : true})

// methods of users

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password =  await bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password)
}

// userSchema.methods.GenerateAccessToken = function (){
//     console.log(ACCESS_TOKEN_SECRET ,"accessTokr");
    
//     return jwt.sign({
//         _id : this._id,
//         email : this.email,
//         fullName : this.fullName
//         },
//         process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
//     )
// }

// userSchema.methods.GenerateRefreshToken = function(){
//         console.log(REFRESH_TOKEN_SECRET ,"refreshtoken");

//     return jwt.sign({
//         _id : this._id
//     } , process.env.REFRESH_TOKEN_SECRET , {expiresIn : process.env.REFRESH_TOKEN_EXPIRY})
// }



//---------------------------------------

userSchema.methods.GenerateAccessToken = function () {
    console.log(process.env.ACCESS_TOKEN_SECRET, "accessToken");

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        // { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.GenerateRefreshToken = function () {
    // console.log(process.env.REFRESH_TOKEN_SECRET, "refreshToken");

    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

const User = mongoose.model("User" , userSchema)

export default User 