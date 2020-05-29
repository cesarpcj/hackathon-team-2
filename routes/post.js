const { Router } = require('express');
const router = new Router();
const Post = require('./../models/post');
const User = require('./../models/user');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'HACKATHON'
  }
});

const uploader = multer({ storage });

router.get('/', (req, res, next) => {
  Post.find()
    .populate('creator')
    .then((posts) => {
      res.render('/', { posts });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/post/:postId/delete', (req, res, next) => {
  const postId = req.params.postId;
  Post.findByIdAndRemove(postId)
    .then((post) => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/post/create', (req, res, next) => {
  res.render('post/create');
});

router.post('/post/create', uploader.single('media'), (req, res, next) => {
  const { name, description, type } = req.body;
  const pictureUrl = req.file.path;
  Post.create({
    name,
    description,
    creator: req.user._id,
    pictureUrl,
    category: type
  })
    .then((newPost) => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/post/channel/:category', (req, res, next) => {
  const category = req.params.category;
  Post.find({ category })
    .then((posts) => {
      res.render('/', posts);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/post/:postId', (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .populate('creator')
    .then((post) => {
      res.render('single', { post });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
