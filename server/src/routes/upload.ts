import express from 'express'
import { getAllPosts, uploadImage, deletePost } from '../controllers/uploadController'

const router = express.Router()

// Получить посты: GET /api/posts
router.get('/', getAllPosts)

// Создать пост: POST /api/posts
router.post('/', uploadImage)

// Удалить пост: DELETE /api/posts/:id
router.delete('/:id', deletePost)

export default router
