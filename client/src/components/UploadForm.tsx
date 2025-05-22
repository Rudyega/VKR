'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function UploadForm() {
  const { data: session, status } = useSession()
  const userId = (session?.user as any)?.id

  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file || !userId) {
      alert('Вы должны быть авторизованы для загрузки.')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'your_preset') // замени на свой Cloudinary preset

      const cloudRes = await fetch('https://api.cloudinary.com/v1_1/your-cloud/image/upload', {
        method: 'POST',
        body: formData,
      })

      const cloudData = await cloudRes.json()
      if (!cloudData.secure_url) throw new Error('Ошибка загрузки изображения в Cloudinary')

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || '',
          description: description || '',
          imageUrl: cloudData.secure_url,
          userId,
        }),
      })

      if (res.ok) {
        alert('Пост успешно загружен!')
        setFile(null)
        setTitle('')
        setDescription('')
      } else {
        alert('Ошибка при отправке поста')
      }
    } catch (err) {
      console.error(err)
      alert('Ошибка при загрузке')
    }

    setLoading(false)
  }

  if (status === 'loading') return null
  if (!userId) return null // или вернуть компонент "Войдите для загрузки"

  return (
    <div className="p-4 border rounded-xl max-w-md mx-auto space-y-4 bg-white shadow">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full"
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название (необязательно)"
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание (необязательно)"
        className="w-full border p-2 rounded"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-amber-300 hover:bg-amber-400 text-black font-semibold py-2 px-4 rounded"
      >
        {loading ? 'Загрузка...' : 'Загрузить пост'}
      </button>
    </div>
  )
}
