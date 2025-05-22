'use client'

import Link from "next/link"
import { Plus } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export function Header() {
  const { data: session, status } = useSession()

  const isLoading = status === "loading"
  const isLoggedIn = !!session?.user

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#f5e1c9] shadow-sm px-6 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-[#3a2e1c]">
        BiscuitBoard
      </Link>

      <input
        type="text"
        placeholder="Поиск идей..."
        className="w-1/3 px-4 py-2 rounded-full border border-[#e0d1bc] text-sm focus:outline-none focus:ring-2 focus:ring-[#f5e1c9]"
      />

      {!isLoading && (
        <div className="flex gap-3 items-center">
          {isLoggedIn ? (
            <>
              <Link href="/upload">
                <button className="flex items-center gap-2 bg-amber-300 hover:bg-amber-400 text-black font-semibold py-2 px-4 rounded-full shadow">
                  <Plus size={20} />
                  <span className="hidden sm:inline">Создать</span>
                </button>
              </Link>

              {session?.user?.name && (
                <span className="text-sm text-[#3a2e1c] hidden sm:inline">
                  {session.user.name}
                </span>
              )}

              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 transition"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-[#3a2e1c] bg-[#f5e1c9] rounded-full hover:bg-[#e9cfae] transition"
              >
                Войти
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 transition"
              >
                Регистрация
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}