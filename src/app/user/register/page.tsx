"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post(
        "https://acesoftech.co.in/API/blog_api/register.php",
        form
      );
      setSuccess("Registered successfully!");
      setTimeout(() => {
        router.push("/user/login");
      }, 1500);
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded-lg shadow-md bg-white">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
        Register
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border text-black border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-md border text-black border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            disabled={loading}
            autoComplete="new-password"
          />
        </div>

        {error && (
          <p className="text-red-600 font-semibold text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 font-semibold text-center">{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md font-semibold text-white transition ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          aria-busy={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
