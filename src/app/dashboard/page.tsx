'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (!user) {
      router.push('/login');
    } else {
      setUsername(user);
    }
  }, []);

  if (!username) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold">Welcome, {username}!</h1>
      <p className="text-gray-600 mt-4">You're logged in to the blog admin dashboard.</p>
    </div>
  );
}
