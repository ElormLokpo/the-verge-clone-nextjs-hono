import { Hono } from "hono";

import { authMiddleware } from "../auth/auth.middleware";

import * as commentController from "./comment.controller";

export const commentRoutes = new Hono();



commentRoutes.get(
    "/post/:postId",
    commentController.getComments,
);



commentRoutes.post(
    "/post/:postId",
    authMiddleware,
    commentController.createComment,
);

commentRoutes.patch(
    "/:id",
    authMiddleware,
    commentController.updateComment,
);

commentRoutes.delete(
    "/:id",
    authMiddleware,
    commentController.deleteComment,
);