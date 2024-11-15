const User = require('../models/User')
const mongoose = require('mongoose')

// get all Users
const getAllUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

// get a User
const getUserById = async (req, res) => {
    const { id } = req.params

    // check if id is valid, to prevent app crash
    // basically, there is like a requirements for ObjectId in mongoose
    // if it doesnt meet the requirement it can cause the app to crash
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "There is no such user!"})
    }

    const user = await User.findById(id)
    
    if(!user) {
        return res.status(404).json({error: "There is no such user!"})
    }

    res.status(200).json(user)
}

// create a User
const createUser = async (req, res) => {
    const { name, email, username, password, dateOfBirth, gender } = req.body
    
    // add document to db
    try {
        const user = await User.create({name, email, username, password, dateOfBirth, gender})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a User
const deleteUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "There is no such user!"})
    }

    const user = await User.findOneAndDelete({ _id : id })

    if(!user) {
        return res.status(404).json({error: "There is no such user!"})
    }

    res.status(200).json(user)

}

// update a User
const updateUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "There is no such user!"})
    }

    const user = await User.findOneAndUpdate({ _id : id }, {
        ...req.body
    })

    if(!user) {
        return res.status(404).json({error: "There is no such user!"})
    }

    res.status(200).json(user)
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}