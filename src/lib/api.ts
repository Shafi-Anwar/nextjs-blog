import axios from "axios";

const API_BASE_URL = "https://acesoftech.co.in/API/blog_api/";

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface Category {
  id: string;
  post_tittle: string;
  post_des: string;
}

// Auth
export const loginUser = async (credentials: LoginCredentials) => {
  const response = await axios.post(`${API_BASE_URL}login.php`, credentials);
  return response.data;
};

// Users
export const createUser = async (user: Record<string, any>) => {
  const response = await axios.post(`${API_BASE_URL}insert.php`, user);
  return response.data;
};

export const deleteUser = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}delete.php?id=${id}`);
  return response.data;
};

export const updateUser = async (id: string, user: Record<string, any>) => {
  const response = await axios.post(`${API_BASE_URL}update.php?id=${id}`, user);
  return response.data;
};

// Categories / Posts
export const createCategory = async (category: {
  post_tittle: string;
  post_des: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}insert.php`, category);
  return response.data;
};

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_BASE_URL}view.php`);
  return response.data.records || [];
};

export const getSingleCategory = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}edit.php?id=${id}`);
  return response.data;
};

export const updateCategory = async (
  id: string | number,
  category: { post_tittle: string; post_des: string }
) => {
  const response = await axios.post(
    `${API_BASE_URL}update.php?id=${id}`,
    category
  );
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await axios.post(`${API_BASE_URL}delete.php`, {
    id: postId,
  });
  return response.data;
};
export interface Article {
  id: string;
  post_tittle: string;
  post_des: string;
}export const getAllArticles = async (id: string) => {
  const response = await axios.get(
    `${API_BASE_URL}add-article.php?mode=view`
  );
  return response.data.records || [];
};

export const createArticle = async (
  article: { article_title: string; article_des: string },

) => {
  const response = await axios.post(
    `${API_BASE_URL}add-article.php?mode=add`,
    article
  );
  return response.data;
};


export const deleteArticle = async (id: string | number) => {
  const response = await axios.post(`${API_BASE_URL}delete-article.php`, {
    id,
  });
  return response.data;
};

export const getSingleArticle = async (id: string | number) => {
  const response = await axios.get(`${API_BASE_URL}edit-article.php?id=${id}`);
  return response.data;
};

export const updateArticle = async (
  id: string | number,
  article: { article_title: string; article_des: string }
) => {
  const response = await axios.post(
    `${API_BASE_URL}update-article.php?id=${id}`,
    article
  );
  return response.data;
};
