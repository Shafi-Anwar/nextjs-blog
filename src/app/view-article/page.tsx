"use client";
import { useEffect, useState, useCallback } from "react";
import { getAllArticles, deleteArticle } from "@/lib/api";
import { useRouter, useParams } from "next/navigation";

interface Article {
  id: string;
  post_tittle: string;
  post_des: string;
}

export default function ViewArticles() {
  const { id } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllArticles(id as string);
      setArticles(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load articles. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;
    setDeletingId(id);
    try {
      await deleteArticle(id);
      await fetchArticles();
    } catch (err) {
      console.error(err);
      setError("Failed to delete article. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/edit-article/${id}`);
  };

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
        All Blog Articles
      </h1>

      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded">
          {error}
        </div>
      )}

      {articles.length === 0 ? (
        <p className="text-gray-600">No articles found.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300 text-left text-gray-700">
                #
              </th>
              <th className="p-3 border border-gray-300 text-left text-gray-700">
                Article Title
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
            {articles.map((art, i) => (
              <tr
                key={art.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-3 border border-gray-300 text-gray-700">
                  {i + 1}
                </td>
                <td className="p-3 border border-gray-300 text-gray-900 font-medium">
                  {art.post_tittle}
                </td>
                <td className="p-3 border border-gray-300 text-gray-700">
                  {art.post_des}
                </td>
                <td className="p-3 border border-gray-300 text-center space-x-3">
                  <button
                    onClick={() => handleEdit(art.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(art.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded disabled:opacity-50"
                    disabled={deletingId === art.id}
                  >
                    {deletingId === art.id ? "Deleting..." : "Delete"}
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
