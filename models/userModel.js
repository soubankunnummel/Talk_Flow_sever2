import mongoose, { Schema } from 'mongoose'

const userSchema = Schema({
    name: {type: String, required:true},
    username:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:false, minLength:6},
    profilePic:{type:String,default:""},
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    bio: {
        type: String,
        default: "",
    },
    isFrozen: {
        type: Boolean,
        default: false,
    }, 
    resetPasswordOTP: {
        type: String,
        default: null,
    },
    resetPasswordOTPGeneratedAt: {
        type: Date,
        default: null,
    },
    repliedPosts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Post",
        default: [],
    },


},{
    timestamps: true,
}
)

const UserModel = mongoose.model("User",userSchema);
export default UserModel