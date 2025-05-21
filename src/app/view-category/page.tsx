"use client";
import { useEffect, useState, useCallback } from "react";
import { getAllCategories, deleteCategory } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  post_tittle: string;
  post_des: string;
}

export default function ViewCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmed) return;

    setDeletingId(id);
    setError(null);

    try {
      await deleteCategory(id);
      await fetchCategories();
    } catch {
      setError("Failed to delete category. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/edit-category/${id}`);
    },
    [router]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        All Blog Categories
      </h1>

      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded">
          {error}
        </div>
      )}

      {categories.length === 0 ? (
        <p className="text-gray-600">No categories found.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300 text-left text-gray-700">
                #
              </th>
              <th className="p-3 border border-gray-300 text-left text-gray-700">
                Category Name
              </th>
              <th className="p-3 border border-gray-300 text-left text-gray-700">
                Description
              </th>
              <th className="p-3 border border-gray-300 text-center text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, i) => (
              <tr
                key={cat.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-3 border border-gray-300 text-gray-700">
                  {i + 1}
                </td>
                <td className="p-3 border border-gray-300 text-gray-900 font-medium">
                  {cat.post_tittle}
                </td>
                <td className="p-3 border border-gray-300 text-gray-700">
                  {cat.post_des}
                </td>
                <td className="p-3 border border-gray-300 text-center space-x-3">
                  <button
                    onClick={() => handleEdit(cat.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded transition"
                    aria-label={`Edit category ${cat.post_tittle}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={deletingId === cat.id}
                    aria-label={`Delete category ${cat.post_tittle}`}
                  >
                    {deletingId === cat.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
