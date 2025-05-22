import express from 'express'
import {
  register,
  forgotPassword,
  resetPassword,
  login, // ⬅ добавили
} from '../controllers/authController'

const router = express.Router()

// Регистрация с подтверждением по email
router.post('/register', register)

//  Вход для CredentialsProvider (next-auth)
router.post('/login', login)

// Сброс пароля
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

export default router
