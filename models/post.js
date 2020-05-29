'use strict';

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  name: {
    type: String,
    minlength: 1,
    maxlength: 20
  },

  text: {
    type: String
  }
});

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 1,
      maxlength: 20,
      required: true
    },
    description: {
      type: String,
      minlength: 1,
      maxlength: 200,
      required: true
    },

    category: {
      type: String,
      enum: ['dancing', 'singing', 'crafts', 'sports', 'art', 'games', 'public-speaking', 'cooking']
    },
    like_count: {
      type: Number,
      default: 0
    },
    // user_liked: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     // unique: true,
    //     ref: "User"
    //   }
    // ],

    pictureUrl: {
      type: String
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },

    comments: [commentSchema],
    location: {
      type: {
        type: String,
        default: 'Point',
        required: true
      },
      coordinates: [
        {
          type: mongoose.Schema.Types.Decimal128,
          min: -180,
          max: 180
        }
      ]
    }
  },

  {
    timestamps: {
      /*currentTime: () => Math.floor(Date.now() / 1000)*/
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    }
  },
  {
    time: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model('Post', postSchema);
