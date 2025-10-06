const express=require('express');
const { registerUser, loginUser, logoutUser, userRefreshToken } = require('../controllers/identity-controller');
const router=express.Router();

// express rate limiter used for apply rate limiting on specific routes
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/refresh-token',userRefreshToken);
router.post('/logout',logoutUser);

module.exports=router;