const express = require('express')
const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    signupUser
} = require('../controllers/userController')


const router = express.Router()

// login route 
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

module.exports = router