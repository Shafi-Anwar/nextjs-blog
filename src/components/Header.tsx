"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="font-extrabold text-2xl tracking-wide hover:text-indigo-400 transition-colors cursor-pointer">
          <Link href="/">Blog Admin</Link>
        </h1>

        <nav className="flex items-center space-x-6 text-lg">
          <Link
            href="/"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/add-category"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Add Categories
          </Link>
          <Link
            href="/view-category"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            View Category
          </Link>
          <Link
            href="/add-article"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Add Article
          </Link>
          <Link
            href="/view-article"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            View Articles
          </Link>

          {username ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="ml-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold px-4 py-1 rounded-lg shadow-md transition duration-200"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/user/register"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Register
              </Link>
              <Link
                href="/user/login"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
