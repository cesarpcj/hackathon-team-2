"use strict";

const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const connectMongo = require("connect-mongo");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const logger = require("morgan");
const mongoose = require("mongoose");
const serveFavicon = require("serve-favicon");
const basicAuthenticationDeserializer = require("./middleware/basic-authentication-deserializer.js");
const bindUserToViewLocals = require("./middleware/bind-user-to-view-locals.js");

//ROUTERS----------------------------------------------------
const indexRouter = require("./routes/index");
const router = require("./routes/authentication");

const postRouter = require("./routes/post");

const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(serveFavicon(join(__dirname, "public/images", "favicon.ico")));
app.use(express.static(join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 15 * 1000,
      sameSite: "lax",
      httpOnly: true
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

app.use("/", indexRouter);
app.use("/authentication", router);
app.use("/", postRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};
  res.status(error.status || 500);
  res.render("error");
});

module.exports = app;
