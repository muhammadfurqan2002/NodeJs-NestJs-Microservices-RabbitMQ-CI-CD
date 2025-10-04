const express=require('express');
const { registerUser } = require('../controllers/identity-controller');
const router=express.Router();

// express rate limiter used for apply rate limiting on specific routes
router.post('/register',registerUser);

module.exports=router;