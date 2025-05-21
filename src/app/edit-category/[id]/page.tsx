"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSingleCategory, updateCategory } from "@/lib/api";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState({ post_tittle: "", post_des: "" });

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const res = await getSingleCategory(id as string);
      if (res) {
        setCategory({
          post_tittle: res.post_tittle || "",
          post_des: res.post_des || "",
        });
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) return;
      await updateCategory(id as string, category);
      alert("Category updated successfully");
      router.push("/view-category");
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
          Update
        </button>
      </form>
    </div>
  );
}
