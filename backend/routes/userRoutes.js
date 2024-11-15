const express = require('express')
const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')


const router = express.Router()

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

module.exports = router