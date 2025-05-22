import { Request, Response } from 'express'
import cloudinary from '../utils/cloudinary'
import Post from '../models/Post'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET!

// Загрузка изображения
export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await getToken({ req, secret })
    const userId = token?.sub

    if (!userId) {
      res.status(401).json({ message: 'Пользователь не авторизован' })
      return
    }

    const { title, description, imageUrl } = req.body

    if (!imageUrl) {
      res.status(400).json({ message: 'Image URL обязателен' })
      return
    }

    const newPost = new Post({
      title: title || '',
      description: description || '',
      imageUrl,
      userId,
    })

    await newPost.save()

    res.status(201).json({ message: 'Пост создан', post: newPost })
  } catch (err) {
    console.error('[POST ERROR]', err)
    res.status(500).json({ message: 'Ошибка при создании поста' })
  }
}

// Получить все посты
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'username')
    res.json(posts)
  } catch (err) {
    console.error('[GET POSTS ERROR]', err)
    res.status(500).json({ error: 'Ошибка при получении постов' })
  }
}

// Удаление поста
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await getToken({ req, secret })
    const userId = token?.sub

    if (!userId) {
      res.status(401).json({ error: 'Пользователь не авторизован' })
      return
    }

    const post = await Post.findById(req.params.id)

    if (!post) {
      res.status(404).json({ error: 'Пост не найден' })
      return
    }

    if (post.userId.toString() !== userId) {
      res.status(403).json({ error: 'Нет доступа' })
      return
    }

    await post.deleteOne()
    res.json({ message: 'Пост удалён' })
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении' })
  }
}
