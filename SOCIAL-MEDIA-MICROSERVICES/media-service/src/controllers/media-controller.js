const Media = require("../models/media");
const {uploadMediaTpCloudinary} = require("../utils/cloudinary");
const logger = require("../utils/logger")


const uploadMedia = async (req, res) => {
    logger.info("Media Upload Started");
    try {
        if (!req.file) {
            logger.warn("No file found. Please add a new file and try again!");
            return res.status(400).json({
                success: false,
                message: "No file found. Please add a new file and try again!"
            })
        }
        const { originalname, mimetype, buffer } = req.file;
        const userId  = req.user.userId

        logger.info(`File Details: ${originalname}, type${mimetype}`)
        logger.info("Uploading to cloudinary has been started")

        const cloud = await uploadMediaTpCloudinary(req.file);
        logger.info(`Uploading to cloudinary has been successful: ${cloud.public_id}`)
        const newMedia = await Media.create({
            publicId: cloud.public_id,
            originalName:originalname,
            mimeType:mimetype,
            url: cloud.secure_url,
            userId
        })
        res.status(201).json({
            success: true,
            mediaId: newMedia._id,
            message: "Media Uploaded successfully"
        })
    } catch (e) {
        logger.error("Error uploading media", e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const getAllMedias=async(req,res)=>{
    try{
        const medias=await Media.find({})
        res.json({medias});
    }catch(e){
        logger.error("Error fetching medias", e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports = { uploadMedia,getAllMedias };