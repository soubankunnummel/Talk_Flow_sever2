import mongoose, { Schema } from "mongoose";

const postSchema = Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    maxLength: 500,
  },
  img: {
    type: String,
  },
  thambImg: {
    type: String,
  },
  likes: {
    // arry of user ids
    type: [mongoose.Schema.Types.ObjectId],
    ref: " User",
    default: [],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Method to add a like on the post
 
const commentSchema = mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;


postSchema.index({ postedBy: 1, createdAt: -1 }); 

postSchema.virtual("commentCount").get(function() {
    return this.comments.length;
});

postSchema.pre("findOneAndDelete", async function(next) {
    // Perform additional cleanup actions when a post is deleted
    await Comment.deleteMany({ postId: this.getQuery()._id });
    next();
});


postSchema.methods.addLike = async function(userId) {
    if (!this.likes.some(like => like.userId.equals(userId))) {
        this.likes.push({ userId });
        await this.save();
    }
};