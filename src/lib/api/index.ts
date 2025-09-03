import httpService from "./axios";

const contactusUrl = "/contact";

/** ADMIN */
const adminLoginUrl = "/admin/login";
const getAdminUserUrl = "/admin/get_users";
const createPostUrl = "/posts";
const uploadImageUrl = "/posts/upload-image";

/** General url */
const getAllPostsUrl = "/posts";
const getAllDraftsUrl = "/posts/drafts";
const getPostByIdUrl = "/posts";
const deletePostUrl = "/posts";

/** ORDERS */
const getOrdersUrl = "/orders";
const getOrdersByUserUrl = "/orders/user";

/**USERS */
const createUserUrl = "/users";
const getUserByIdUrl = "/users";

/** GALLERY */
const getAllGalleryUrl = "/gallery";
const createGalleryUrl = "/gallery";
const deleteGalleryUrl = "/gallery";
const getGalleryBySlugUrl = "/gallery";
const updateGalleryUrl = "/gallery";
const deleteGalleryImageUrl = "/gallery";

export const contactUs = async (data: any) => {
  return httpService.post(contactusUrl, data);
};

/** ADMIN */

export const adminLogin = async (data: any) => {
  return httpService.post(adminLoginUrl, data);
};

export const getAdminUser = async (
  page: string | number,
  limit: string | number
) => {
  return httpService.get(getAdminUserUrl, { params: { page, limit } });
};

export const createPost = async (data: any) => {
  return httpService.post(createPostUrl, data);
};

export const updatePost = async (id: string | number, data: any) => {
  return httpService.put(`${createPostUrl}/${id}`, data);
};

export const deletePost = async (id: string | number) => {
  return httpService.delete(`${deletePostUrl}/${id}`);
};

export const getAllPosts = async (
  page: string | number,
  limit: string | number
) => {
  return httpService.get(getAllPostsUrl, { params: { page, limit } });
};

export const getAllDrafts = async (
  page: string | number,
  limit: string | number
) => {
  return httpService.get(getAllDraftsUrl, { params: { page, limit } });
};

export const getPostById = async (id: string | number) => {
  return httpService.get(`${getPostByIdUrl}/${id}`);
};

export const uploadImage = async (data: any) => {
  return httpService.post(uploadImageUrl, data);
};

/** ORDERS */
export const getOrders = async (
  page: string | number,
  limit: string | number
) => {
  return httpService.get(getOrdersUrl, { params: { page, limit } });
};

export const getOrdersByStatus = async (
  page: string | number,
  limit: string | number,
  status: string
) => {
  return httpService.get(getOrdersUrl, {
    params: { page, limit, status },
  });
};

export const createOrder = async (data: any) => {
  return httpService.post(getOrdersUrl, data);
};

export const getOrdersByUser = async (userId: string | number | null) => {
  return httpService.get(`${getOrdersByUserUrl}/${userId}`);
};

export const getOrdersById = async (id: string | number) => {
  return httpService.get(`${getOrdersUrl}/${id}`);
};

export const upDateStatusOfOrder = async (id: string | number, data: any) => {
  return httpService.put(`${getOrdersUrl}/${id}/status`, data);
};

/** USERS */
export const createUsers = async (data: any) => {
  return httpService.post(createUserUrl, data);
};

export const getUserById = async (id: string | number) => {
  return httpService.get(`${getUserByIdUrl}/${id}`);
};

/** GALLERY */

export const getAllGallery = async (
  page: string | number,
  limit: string | number
) => {
  return httpService.get(getAllGalleryUrl, { params: { page, limit } });
};

export const createGallery = async (data: any) => {
  return httpService.post(createGalleryUrl, data);
};

export const deleteGallery = async (id: string | number) => {
  return httpService.delete(`${deleteGalleryUrl}/${id}`);
};

export const getGalleryBySlug = async (slug: string) => {
  return httpService.get(`${getGalleryBySlugUrl}/${slug}`);
};

export const updateGallery = async (id: string, data: any) => {
  return httpService.put(`${updateGalleryUrl}/${id}`, data);
};

export const deleteGalleryImage = async (id: string, data: any) => {
  return httpService.delete(`${deleteGalleryImageUrl}/${id}/image`, {
    data,
  });
};
