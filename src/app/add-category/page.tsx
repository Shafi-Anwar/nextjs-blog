"use client";
import { useState } from "react";
import { createCategory } from "@/lib/api";

export default function AddCategoryPage() {
  const [category, setCategory] = useState({ post_tittle: "", post_des: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory(category);
      alert("Category added successfully");
      setCategory({ post_tittle: "", post_des: "" });
    } catch (error) {
      alert("Failed to add category");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add Blog Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          value={category.post_tittle}
          onChange={(e) =>
            setCategory({ ...category, post_tittle: e.target.value })
          }
          className="w-full border p-2"
          required
        />
        <textarea
          placeholder="Category Description"
          value={category.post_des}
          onChange={(e) =>
            setCategory({ ...category, post_des: e.target.value })
          }
          className="w-full border p-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
}
