import express from 'express';

import { getPosts, createPost, updatePost, deletePost, getPostsBySearch } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/search', getPostsBySearch);

export default router;