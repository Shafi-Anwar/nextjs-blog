"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface BlogPost {
  post_tittle: string;
  post_des: string;
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.post(
          "https://acesoftech.co.in/API/blog_api/singleblog.php",
          { id }
        );
        setPost(res.data);
      } catch (error) {
        setError("Failed to load blog post. Please try again later.");
        console.error("Failed to load blog post", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  if (error)
    return (
      <p className="text-center mt-20 text-red-600 font-semibold">{error}</p>
    );

  if (!post)
    return (
      <p className="text-center mt-20 text-gray-700">
        No post found with this ID.
      </p>
    );

  return (
    <article className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
        {post.post_tittle}
      </h1>
      <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
        {post.post_des}
      </p>
    </article>
  );
}
