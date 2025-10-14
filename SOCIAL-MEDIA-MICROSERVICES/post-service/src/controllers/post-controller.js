const Post = require("../models/post");
const logger = require("../utils/logger");
const { publishEvent } = require("../utils/rabbitmq");
const { validatingCreatePost } = require("../utils/validation");


async function invalidatePostCache(req, input) {

    const cacheKey = `post:${input}`;
    await req.redisClient.del(cacheKey);
    const keys = await req.redisClient.keys("posts:*");
    if (keys.length > 0) {
        await req.redisClient.del(keys);
    }
}


const createPost = async (req, res) => {
    logger.info("Create Post endpoint hit");
    try {


        const { error } = validatingCreatePost(req.body);

        if (error) {
            logger.warn("Validation error", error.details[0].message);
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            })
        }

        const { content, mediaIds } = req.body;
        const post = new Post({
            user: req.user.userId,
            content,
            mediaIds
        });


        await post.save();

        await invalidatePostCache(req, post._id.toString())

        logger.info("Post created successfully", post);

        res.status(201).json({
            success: true,
            message: "Post created successfully"
        })

    } catch (e) {
        logger.error("Error creating post", e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
const fetchPosts = async (req, res) => {
    logger.info("Fetching Posts endpoint hit");
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        const cacheKey = `posts:${page}:${limit}`;
        const cachePosts = await req.redisClient.get(cacheKey);

        if (cachePosts) {
            return res.json(JSON.parse(cachePosts));
        }
        const posts = await Post.find({}).sort({ createdAt: -1 }).skip(startIndex).limit(limit);
        const totalNoOfPosts = await Post.countDocuments();
        const result = {
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalNoOfPosts / limit),
            totalPosts: totalNoOfPosts
        }
        await req.redisClient.setex(cacheKey, 300, JSON.stringify(result));

        res.json(result);

    } catch (e) {
        logger.error("Error Fetching posts", e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
const getPost = async (req, res) => {
    logger.info("Get post endpoint hit");
    try {
        const postId = req.params.id;
        const cacheKey = `post:${postId}`;
        const cachedPost = await req.redisClient.get(cacheKey);
        if (cachedPost) {
            return res.json(JSON.parse(cachedPost));
        }
        const singlePost = await Post.findById(postId);
        if (!singlePost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        await req.redisClient.setex(cacheKey, 300, JSON.stringify(singlePost));
        res.json(singlePost);
    } catch (e) {
        logger.error("Error getting post", e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
const deletePost = async (req, res) => {
    logger.info("Delete post endpoint hit");
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        // publish post delete method
        await publishEvent("post.deleted", {
            postId: post._id.toString(),
            userId: req.user.userId,
            mediaId: post.mediaIds
        })
        await invalidatePostCache(req, req.params.id)
        res.json({
            message: "Post deleted successfully"
        })
    } catch (e) {
        logger.error("Error deleting post", e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



module.exports = {
    createPost,
    fetchPosts,
    getPost,
    deletePost
}