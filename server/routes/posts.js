import express from 'express';

import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js';

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
// READ

router.get('/', verifyToken, getFeedPosts);
router.get(':/userId/posts', verifyToken, getFeedPosts);

//UPDATE
router.patch(':/is/like', verifyToken, likePost);

export default router;
