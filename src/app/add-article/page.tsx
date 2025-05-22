"use client";
import { useState } from "react";
import { createArticle } from "@/lib/api";
import { useParams } from "next/navigation";
export default function AddArticlePage() {
  const [article, setArticle] = useState({
    article_title: "",
    article_des: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createArticle(article);
      alert("Article added successfully");
      setArticle({ article_title: "", article_des: "" });
      console.log(article);
    } catch (error) {
      alert("Failed to add article");
      console.error("Error adding article:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add Blog Article</h1>
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
          placeholder="Write Article"
          value={article.article_des}
          onChange={(e) =>
            setArticle({ ...article, article_des: e.target.value })
          }
          className="border p-2 w-[500px] h-[200px]"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
}
