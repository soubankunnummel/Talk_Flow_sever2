// import multer from "multer";
// import path from "path";
// import sharp from "sharp";
// import fs from "fs";


// import { v2 as cloudinary } from "cloudinary";

// const storage = multer.diskStorage({});

// export const upload = multer({ storage });

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRE,
//   });
  

// export const imageUpload = async (req, res, next) => {
//   try {
//     if (req.query.imageType === "null") {
//       return next();
//     }
//     if (!req.file) {
//       throw new Error("No file uploaded");
//     }

//     // compress image

//     // const inputPath = req.file.path;
//     // const outputDir = path.join("uploads", "compressed");
//     // const outputPath = path.join(outputDir, `compressed_${req.file.filename}`);

//     // if (!fs.existsSync(outputDir)) {
//     //     fs.mkdirSync(outputDir, { recursive: true });
//     //   }
  
//     //   await sharp(inputPath)
//     //     .resize({ width: 800 })
//     //     .jpeg({ quality: 10 })
//     //     .toFile(outputPath);


    
//     const uploadImage = await cloudinary.uploader.upload(req.file.path, {
//       folder: "TalkFlow2",

//     });

//     req.imagUrl = uploadImage.secure_url
//     next()
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

import dotenv from 'dotenv'
dotenv.config()
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";



const storage = multer.diskStorage({});

export const upload = multer({ storage });


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRE,
});

 const fileUpload = async (req, res, next) => {
 try {

  
  if (!req.file) {
    return next();
    // throw new Error("No file uploaded");
  }
     
     const uploadFile = await cloudinary.uploader.upload(req.file.path, { 
       folder: "Employee",
     });
   
     fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log(`Deleted temporary file ${req.file.path}`);
        }
      });
   
     req.imagUrl = uploadFile.secure_url;
     req.publiId = uploadFile.public_id
     next()
 } catch (error) {
    res.status(400).json({ message: error.message });
    
 }
};

export default fileUpload

export const removeFileFromCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    console.log("File removed from Cloudinary");
  } catch (error) {
    console.error("Error removing file from Cloudinary:", error);
  }
}
