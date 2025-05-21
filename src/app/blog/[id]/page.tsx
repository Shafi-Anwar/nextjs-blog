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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.post(
          "https://acesoftech.co.in/API/blog_api/singleblog.php",
          { id }
        );
        setPost(res.data);
      } catch (error) {
        console.error("Failed to load blog post", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">{post.post_tittle}</h1>
      <p className="text-lg">{post.post_des}</p>
    </div>
  );
}
