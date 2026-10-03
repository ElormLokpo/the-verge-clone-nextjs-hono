export const API_ROUTES = {
  register: `auth/register`,
  login: `auth/login`,
  verifyEmail: `auth/verify-email`,
  forgotPassword: `auth/forgot-password`,
  resetPassword: `auth/reset-password`,
  getPosts: `posts/all`,
  getPost: `posts/:id`,
  createPost: `posts/create`,
  updatePost: `posts/:id`,
  deletePost: `posts/:id`,
};

export const CLIENT_ROUTES = {
  signIn: `/auth/sign-in`,
  signUp: `/auth/sign-up`,
  verifyEmail: `/auth/verify-email`,
  forgotPassword: `/auth/forgot-password`,
  resetPassword: `/auth/reset-password`,
  home: `/`,
  createPost: `/post/create-post`,
};
