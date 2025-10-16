const cloudinary = require("cloudinary").v2;

const logger = require("./logger")

cloudinary.config({
})



const uploadMediaTpCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto"
            },
            (error, result) => {
                if (error) {
                    logger.warn("Error while uploading file to cloudinary")
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
        uploadStream.end(file.buffer);
    })
}


const deleteMediaFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        logger.info("Media deleted successfully from cloud storage", publicId);
        return result;
    } catch (e) {
        logger.error("Error deleting media from cloudinary", e);
        throw e;
    }
}

module.exports = {uploadMediaTpCloudinary,deleteMediaFromCloudinary}



