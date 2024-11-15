const mongoose = require('mongoose')

const Schema = mongoose.Schema

const followerSchema = new mongoose.Schema({
    followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who follows
    followingId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // User being followed
}, { timestamps: true })
  
  module.exports = mongoose.model('Follower', followerSchema);