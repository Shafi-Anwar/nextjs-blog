import axios from "axios";

const API_BASE_URL = "https://acesoftech.co.in/API/blog_api/";

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
  const response = await axios.post(`${API_BASE_URL}/ogin.php`, credentials);
  return response.data;
};

//adding user
// Create a new user
export const createUser = async (user: Record<string, any>) => {
  const response = await axios.post(`${API_BASE_URL}insert.php`, user);
  return response.data;
};

export const deleteUser = async (id: string | number) => {
  const response = axios.get(`${API_BASE_URL}delete.php?id=${id}`);
  return (await response).data;
};

export const updateUser = async (id: string, user: string) => {
  const response = await axios.post(
    `${API_BASE_URL}update.php?id=${id}`,
    user
  );
  return response.data;
};

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await loginUser({ email, password });
    // Handle successful login (e.g., store token, redirect user)
    return response;
  } catch (error) {
    // Handle login error
    throw error;
  }
};

// Create (Insert) Category/Post
export const createCategory = async (category: { post_tittle: string; post_des: string }) => {
  const response = await axios.post(`${API_BASE_URL}insert.php`, category);
  return response.data;
};

// Get All Categories/Posts
export const getAllCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}view.php`);
  return response.data.records || [];
};

// Get Single Category by ID
export const getSingleCategory = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}edit.php?id=${id}`);
  return response.data;
};

// Update Category by ID
export const updateCategory = async (
  id: string | number,
  category: { post_tittle: string; post_des: string }
) => {
  const response = await axios.post(`${API_BASE_URL}update.php?id=${id}`, category);
  return response.data;
};

// Delete Category by ID
export const deleteCategory = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}delete.php?id=${id}`);
  return response.data;
};