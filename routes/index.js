"use strict";

const { Router } = require("express");
const routeGuard = require("./../middleware/route-guard");

//require post model
const Post = require("./../models/post");

/*//require cloudinary packages-------------
const multer = require("multer");
const cloudinary = require("cloudinary");
const multerStorageCloudinary = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: "HACKATHON"
});

const uploader = multer({ storage });
//require cloudinary packages-------------*/

const indexRouter = new Router();

//get posts from database, display by most recent
indexRouter.get("/", (req, res, next) => {
  Post.find()
    .sort({ createdDate: -1 })
    .populate("creator")
    .then((posts) => {
      res.render("index", { posts });
    })
    .catch((error) => {
      next(error);
    });
});

indexRouter.get("/private", routeGuard, (req, res, next) => {
  res.render("private");
});

module.exports = indexRouter;
