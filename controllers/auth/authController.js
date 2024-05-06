import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../../models/userModel.js'


export const SignUp = async (req, res) => {
  
    const { name, email, username, password } = req.body;
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserModel.create({
        name,
        email,
        username,
        password:hashedPassword,

        
      })

      res.status(201).json(newUser);

    
}


//////////////// user Login ////////////////////////

export const login = async (req, res) => {
    const {username, password} = req.body

    const user = await UserModel.findOne({username})
    if (!user) {
        return res.status(401).json({error: "Invalid User Name"});
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(401).json({error: "Invalid Password"});
    }

    const userId =  user._id
    const token =  jwt.sign({userId}, process.env.JWT_SECRET);

    res.status(200).json({user: user, token: token}) 
  }