import PostModel from "../../models/postModel.js";

///////////////// CREAR A NEW POST //////////////

export const createPost = async (req, res) => {
  const { text, img } = req.body;

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
  const post = await PostModel.find().populate('postedBy', 'username name').sort({ createdAt: -1 });;
  if (!post) return res.status(400).json({ error: "NO Post Fount" });
  res.status(200).json(post);
};

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
