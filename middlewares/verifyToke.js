import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'



const verifytoken = async (req, res, next) => {

    const token = req.headers['authorization']
    if (!token) return res.status(403).send({ auth: false, message: 'No Token Provided.' })
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await UserModel.findById(decoded.userId).select("-password")

            req.user = user
            next()
        } catch (error) {
            res.status(500).json({message:error.message})
            console.log("Authentication Err",error.message)
        }

}
export default verifytoken