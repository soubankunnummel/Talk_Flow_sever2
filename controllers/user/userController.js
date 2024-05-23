import UserModel from "../../models/userModel.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  const checkUser = await UserModel.findOne({ username });
  if (!checkUser) return res.status(404).json({ error: "user not fount" });
  res.status(200).json(checkUser);
};

////////***** */ GET LOGIND USER PROFILE ****//////////////////

export const getLogindUser = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ error: "Pleas Login" });
  }
  const currentUser = await UserModel.findById(user._id);
  res.status(200).json(currentUser);
};

/////////////  ALL USERS //////////////////

export const getAllUsers = async (req, res) => {
  const Allusers = await UserModel.find();
  if (!Allusers) {
    return res.status(404).json("Users Not Fount");
  }
  res.status(200).json(Allusers);
};

////////// FOLLOW UNFOLLOW /////////

export const followUnfollow = async (req,res) => { 
  const { username } = req.params;
  const currentUser = req.user;
  const userToFollow = await UserModel.findOne({ username });
  if (!userToFollow) return res.status(404).json({ error: "User not found" });

  if(currentUser.username === username) return res.status(400).json({error:"you can't follow your selfe"})
  if (currentUser.following.includes(userToFollow._id)) {

    // unfollow ---
    
    await UserModel.findByIdAndUpdate(currentUser._id, {
      $pull: { following: userToFollow._id },
    });
    await UserModel.findByIdAndUpdate(userToFollow._id, {
      $pull: { followers: currentUser._id },
    });
    res.status(200).json({ message: `Unfollowed ${username}` });
  } else {

    // follow -----

    await UserModel.findByIdAndUpdate(currentUser._id, {
      $push: { following: userToFollow._id },
    });
    await UserModel.findByIdAndUpdate(userToFollow._id, {
      $push: { followers: currentUser._id },
    });
    res.status(200).json({ message: `Followed ${username}` });
  }
};



///////////// chek follow status ///////////////


export const checkFollow = async (req, res) => {
    const { username } = req.params;
    const currentUser = req.user;

      const userToFollow = await UserModel.findOne({ username });
      if (!userToFollow) return res.status(404).json({ error: "User not found" });
  
      const isFollowing = currentUser.following.includes(userToFollow._id);
      res.status(200).json({ isFollowing });
   
  } 


  
