import multer from "multer";
import path from "path";
import sharp from "sharp";


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const storage = multer.diskStorage({});

export const upload = multer({ storage });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRE,
  });
  

export const imageUpload = async (req, res, next) => {
  try {
    if (req.query.imageType === "null") {
      return next();
    }
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    // compress image

    // const inputPath = req.file.path;
    // const outputDir = path.join("uploads", "compressed");
    // const outputPath = path.join(outputDir, `compressed_${req.file.filename}`);

    // if (!fs.existsSync(outputDir)) {
    //     fs.mkdirSync(outputDir, { recursive: true });
    //   }
  
    //   await sharp(inputPath)
    //     .resize({ width: 800 })
    //     .jpeg({ quality: 10 })
    //     .toFile(outputPath);


    
    const uploadImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "TalkFlow2",

    });

    req.imagUrl = uploadImage.secure_url
    next()
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
