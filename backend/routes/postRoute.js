const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/postController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Routes CRUD pour Post
router.get('/', auth, postCtrl.displayAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.update);
router.delete('/:id', auth, postCtrl.delete);

//Images

//Likes
router.post('/:id/like', auth, sauceCtrl.like);

module.exports = router;