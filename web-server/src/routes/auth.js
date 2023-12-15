const express = require('express')
const controller = require('../controllers/auth')
const { authMiddleware } = require('../middleware/middleware')
const router = express.Router()

//http://localhost:5000/api/auth/getUsualUsers
router.get('/getUser', authMiddleware, controller.getUser)

//http://localhost:5000/api/auth/deleteUser
router.get('/deleteUser', authMiddleware, controller.deleteUser)

// //http://localhost:5000/api/auth/register
router.post('/register', controller.registerUser)

// //http://localhost:5000/api/auth/login
router.post('/login', controller.login)

module.exports = router