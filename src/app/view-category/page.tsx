"use client";
import { useEffect, useState } from "react";
import { getAllCategories, deleteCategory } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  post_tittle: string;
  post_des: string;
}

export default function ViewCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
      fetchCategories();
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/edit-category/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">All Blog Categories</h1>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Category Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, i) => (
            <tr key={cat.id}>
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{cat.post_tittle}</td>
              <td className="p-2 border">{cat.post_des}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(cat.id)}
                  className="bg-yellow-500 text-white px-2 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="bg-red-600 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
