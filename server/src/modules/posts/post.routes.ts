import { Hono } from "hono";

import { authMiddleware } from "../../modules/auth/auth.middleware";

import * as postController from "./post.controller";

export const postRoutes = new Hono();



postRoutes.get("/", postController.getPosts);

postRoutes.get(
  "/:slug",
  postController.getPost,
);



postRoutes.post(
  "/",
  authMiddleware,
  postController.createPost,
);

postRoutes.patch(
  "/:id",
  authMiddleware,
  postController.updatePost,
);

postRoutes.delete(
  "/:id",
  authMiddleware,
  postController.deletePost,
);