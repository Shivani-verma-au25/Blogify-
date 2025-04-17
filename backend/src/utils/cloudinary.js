import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key:  process.env.CLOUD_API_KEY, 
        api_secret:  process.env.CLOUD_SECRECT 
    });


const uploadOnCloudinary = async (localPath) => {
    try {
        if(!localPath)  return null

        const uploadFile = await cloudinary.uploader.upload(localPath ,{
            resource_type : "auto"
        })
        // if file uploaded on cloudinary unlink the file
        // console.log("file is uploaded on cloudinary ", uploadFile.url);
        await fs.unlinkSync(localPath)

        return uploadFile;

    } catch (error) {
        await fs.unlinkSync(localPath)
        return null;
    }
}    

export {uploadOnCloudinary}