import PostModel from "../../models/postModel.js";
import UserModel from "../../models/userModel.js";

///////////////// CREAR A NEW POST //////////////

  export const createPost = async (req, res) => {
    const { text } = req.body;

    console.log(text)

    if (!text) return res.status(400).json({ error: "text filed is emty" });

    const newPost = await PostModel.create({
      postedBy: req.user._id,
      text,  
      img: req.imagUrl,
    });
    res.status(201).json(newPost);     
  };     
 
 
////////  GEL ALL POSTS //////////// 

export const getPosts = async (req, res) => { 
   // Get recent posts
   const recentPosts = await PostModel.find()
   .populate('postedBy', 'username name')
   .sort({ createdAt: -1 })
   .limit(25);

 // Get total count of posts
 const totalPosts = await PostModel.countDocuments();

 // Calculate how many random posts we need
 const randomPostsNeeded = Math.min(25, totalPosts - recentPosts.length);

 // Get random posts, excluding the ones we already have
 const recentPostIds = recentPosts.map(post => post._id);
 const randomPosts = await PostModel.aggregate([
   { $match: { _id: { $nin: recentPostIds } } },
   { $sample: { size: randomPostsNeeded } },
   { $lookup: {
       from: 'users',
       localField: 'postedBy',
       foreignField: '_id',
       as: 'postedBy'
     } 
   },
   { $unwind: '$postedBy' },
   { $project: {
       'postedBy.username': 1,
       'postedBy.name': 1,
       text: 1,
       img: 1,
       likes: 1,
       comments: 1,
       createdAt: 1
     }
   }
 ]);

 // Combine recent and random posts
 const allPosts = [...recentPosts, ...randomPosts];

 // Shuffle the posts
 const shuffledPosts = allPosts.sort(() => 0.5 - Math.random());

 if (shuffledPosts.length === 0) {
   return res.status(404).json({ error: "No posts found" });
 }

 res.status(200).json(shuffledPosts);
};


///////  GET FEED ///////////


export const getFeed = async (req,res) => {

  const currentUser = await UserModel.findById(req.user._id);
  if (!currentUser) {
    return res.status(404).json({ error: "User not found" });
  }

  
  // Get current user's posts
  const userPosts = await PostModel.find({ postedBy: currentUser._id })
  .populate('postedBy', 'username name')
  .sort({ createdAt: -1 });


  // Get posts from users the current user follows
  const followingPosts = await PostModel.find({ 
    postedBy: { $in: currentUser.following },
    _id: { $nin: userPosts.map(post => post._id) }  // Exclude user's own posts
  })
    .populate('postedBy', 'username name')
    .sort({ createdAt: -1 })
    .limit(30);

  // Combine user's posts with following posts, ensuring user's posts are first
  const feedPosts = [...userPosts, ...followingPosts];

  res.status(200).json(feedPosts);

}
  
/////////// LIKE AND UNLIKE //////////////     
 
export const likeUnlike = async (req, res) => { 
  const { id } = req.params; 
  const post = await PostModel.findById(id); 

  if (!post) return res.status(404).json({ error: "Post Not Found" });
 
  if (post.likes.includes(req.user._id)) {
    await PostModel.findByIdAndUpdate(id, { 
      $pull: { likes: req.user._id }
    });
    return res.status(200).json({ message: `Post unliked: ${req.user._id}` });
  } else {
    await PostModel.findByIdAndUpdate(id, {
      $push: { likes: req.user._id }
    });
    return res.status(200).json({ message: `Post liked: ${req.user._id}` });
  }

};

////////// CHECK LIKE //////////

export const checkLike = async (req ,res) => {
  const { id } = req.params;
  const post = await PostModel.findById(id);

  if (!post) return res.status(404).json({ error: "Post Not Found" });

  const status = post.likes.includes(req.user._id);
  return res.status(200).json({ status });

}
 