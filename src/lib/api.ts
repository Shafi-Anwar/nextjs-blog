import axios from "axios";

const API_BASE_URL = "https://acesoftech.co.in/API/blog_api/";

interface LoginCredentials {
  email: string;
  password: string;
}
interface Article {
  id: string;
  article_title: string;
  article_des: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
  const response = await axios.post(`${API_BASE_URL}login.php`, credentials);
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
  const response = await axios.post(`${API_BASE_URL}update.php?id=${id}`, user);
  return response.data;
};

// Create (Insert) Category/Post
export const createCategory = async (category: {
  post_tittle: string;
  post_des: string;
}) => {
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
  const response = await axios.post(
    `${API_BASE_URL}update.php?id=${id}`,
    category
  );
  return response.data;
};

// Delete Category by ID
export const deletePost = async (postId: any) => {
  try {
    const response = await fetch(
      "https://acesoftech.co.in/API/blog_api/delete.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: postId }),
      }
    );

    if (response.ok) {
      console.log("Post deleted successfully");
    } else {
      console.error("Failed to delete post");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllArticles = async (): Promise<Article[]> => {
  const response = await axios.get(`${API_BASE_URL}add-article.php?mode=view`);
  return response.data.records || [];
};

export const createArticle = async (article: {
  article_title: string;
  article_des: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}add-article.php`, article);
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
