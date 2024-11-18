const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

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
        default: 'Others'
    },
    accountType: { 
        type: String, 
        enum: ['free', 'premium'],
        default: 'free'
    },
    profileImage: { type: String, default: null}
}, { timestamps : true })

// static signup method
userSchema.statics.signup = async function(name, email, username, password, dateOfBirth, gender) {

    // validation
    if(!validator.isEmail(email)) {
        throw Error("Not a valid email")
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Not a strong password')
    }

    const emailExists = await this.findOne({email})
    const usernameExists = await this.findOne({username})
    if (emailExists || usernameExists) {
        throw Error("Email or Username has already been taken")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        name,
        email,
        username,
        password: hash,
        dateOfBirth,
        gender
    })

    return user
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('all fields must be filled')
    }
    
    const user = await this.findOne({email})

    if(!user) {
        throw Error("Invalid login credentials")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Invalid login credentials')
    }

    return user
}

module.exports = mongoose.model('User', userSchema);

