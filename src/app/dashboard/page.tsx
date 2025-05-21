"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) {
      router.push("/login");
    } else {
      setUsername(user);
    }
    setLoading(false);
  }, [router]);

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  if (!username) return null;

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-4xl font-extrabold text-gray-900">
        Welcome, {username}!
      </h1>
      <p className="text-gray-600 mt-4">
        You're logged in to the blog admin dashboard.
      </p>
    </div>
  );
}
