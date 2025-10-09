const express = require('express');
const multer = require("multer");
const { uploadMedia } = require('../controllers/media-controller');
const logger = require('../utils/logger');
const authenticatedRequest = require('../middleware/auth-middleware');

const router = express.Router();


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}).single('file')


router.post('/upload', authenticatedRequest, (req, res, next) => {
    upload(req, res, function (error) {
        if (error instanceof multer.MulterError) {
            logger.warn("Multer error while uploading:", error);
            res.status(400).json({
                error: error.message,
                stack: error.stack,
                message: "Multer error while uploading"
            })
        } else if (error) {
            logger.warn("Unknown error while uploading:", error);
            res.status(500).json({
                error: error.message,
                stack: error.stack,
                message: "Unknown error while uploading"
            })
        }
        if (!req.file) {
            res.status(400).json({
                message: "No file found"
            })
        }
        next();
    })
}, uploadMedia);



module.exports=router