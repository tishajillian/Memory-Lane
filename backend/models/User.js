const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Others'],
    },
    accountType: { 
        type: String, 
        enum: ['free', 'premium'],
        default: 'free'
    },
    profileImage: { type: String, default: null}
}, { timestamps : true })

module.exports = mongoose.model('User', userSchema);

