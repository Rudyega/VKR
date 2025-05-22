"use client";

import { useState } from "react";
import Image from "next/image";

export default function UploadPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async () => {
    if (!file || !title) return alert("Добавьте изображение и заголовок");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Изображение успешно загружено!");
      setTitle("");
      setFile(null);
      setPreview(null);
    } else {
      alert("Ошибка загрузки");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Загрузить изображение</h1>

      <div className="flex flex-col gap-4">
        {/* Превью или дропзона */}
        <label className="w-full aspect-square bg-[#f5e1c9] flex items-center justify-center rounded-2xl border border-dashed border-[#e0d1bc] cursor-pointer">
          {preview ? (
            <Image src={preview} alt="preview" width={400} height={400} className="object-cover rounded-2xl" />
          ) : (
            <span className="text-[#5e4a32]">Выберите файл</span>
          )}
          <input type="file" onChange={handleFileChange} accept="image/*" hidden />
        </label>

        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-4 py-2 rounded bg-white border-[#e0d1bc] focus:outline-none"
        />

        <button
          onClick={handleSubmit}
          className="self-start px-6 py-2 bg-[#f5e1c9] text-[#3a2e1c] font-medium rounded-full hover:bg-[#e9cfae] transition"
        >
          Опубликовать
        </button>
      </div>
    </div>
  );
}
