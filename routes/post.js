const { Router } = require("express");
const router = new Router();
const Post = require("./../models/post");
const User = require("./../models/user");

router.get("/", (req, res, next) => {
  Post.find()
    .populate("creator")
    .then((posts) => {
      res.render("/", { posts });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/post/:postId", (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .populate("creator")
    .then((post) => {
      res.render("/single", { post });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/post/:postId/delete", (req, res, next) => {
  const postId = req.params.postId;
  Post.findByIdAndRemove(postId)
    .then((post) => {
      res.render("/");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/post/create", (req, res, next) => {
  res.render("/create");
});

router.post("/post/create", (req, res, next) => {
  const { name, description, creator, media } = req.body;
  Post.create({
    name,
    description,
    creator,
    media,
  })
    .then((newPost) => {
      res.redirect("/");
    })
    .catch((err) => {});
});

router.get("/post/channel/:category", (req, res, next) => {
  const category = req.params.category;
  Post.find({ category })
    .then((posts) => {
      res.render("/", posts);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
