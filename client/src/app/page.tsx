"use client"

import { ImageCard } from "@/components/ImageCard";
import {Header} from "@/components/Header";
import UploadForm from "@/components/UploadForm";

const mockImages = [
  {
    id: 1,
    url: "/test1.jpg",
    title: "Домашний лимонный кекс",
    author: "Наталья",
  },
  {
    id: 2,
    url: "/test2.jpg",
    title: "Цитаты и мотивация",
    author: "Игорь",
  },
  {
    id: 3,
    url: "/test3.jpg",
    title: "Образ дня",
    author: "Анна",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <UploadForm />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[#3a2e1c] mb-6">
          Лента изображений
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockImages.map((img) => (
            <ImageCard key={img.id} {...img} />
          ))}
        </div>
      </div>
    </main>
  );
};


