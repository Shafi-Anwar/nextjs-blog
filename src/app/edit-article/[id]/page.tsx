"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSingleArticle, updateArticle } from "@/lib/api";

export default function EditArticle() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState({ article_title: "", article_des: "" });

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const res = await getSingleArticle(id as string);
      if (res) {
        setArticle({
          article_title: res.article_title || "",
          article_des: res.article_des || "",
        });
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) return;
      await updateArticle(id as string, article);
      alert("Article updated successfully");
      router.push("/view-article");
    } catch (error) {
      alert("Failed to update category");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Article Title"
          value={article.article_title}
          onChange={(e) =>
            setArticle({ ...article, article_title: e.target.value })
          }
          className="w-full border p-2"
          required
        />
        <textarea
          placeholder="Article essay"
          value={article.article_des}
          onChange={(e) =>
            setArticle({ ...article, article_des: e.target.value })
          }
          className="w-full border p-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Update
        </button>
      </form>
    </div>
  );
}
