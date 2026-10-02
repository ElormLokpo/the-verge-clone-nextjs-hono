import type { Context } from "hono";

import {
  createCommentSchema,
  updateCommentSchema,
} from "../../config/validators";

import * as commentService from "./comment.service";

export async function createComment(c: Context) {
  const user = c.get("user");
  const postId = c.req.param("postId");

  const body = await c.req.json();

  const parsed = createCommentSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      {
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      },
      400,
    );
  }

  try {
    const comment = await commentService.createComment(
      postId as string,
      user.id,
      parsed.data.body,
    );

    return c.json(
      {
        data: comment,
      },
      201,
    );
  } catch (error) {
    if (error instanceof Error && error.message === "POST_NOT_FOUND") {
      return c.json(
        {
          message: "Post not found",
        },
        404,
      );
    }

    throw error;
  }
}

export async function getComments(c: Context) {
  const postId = c.req.param("postId");

  const comments = await commentService.getCommentsByPost(postId as string);

  return c.json({
    data: comments,
  });
}

export async function updateComment(c: Context) {
  const user = c.get("user");
  const commentId = c.req.param("id");

  const body = await c.req.json();

  const parsed = updateCommentSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      {
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      },
      400,
    );
  }

  try {
    const comment = await commentService.updateComment(
      commentId as string,
      user.id,
      parsed.data.body,
    );

    return c.json({
      data: comment,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "COMMENT_NOT_FOUND") {
        return c.json(
          {
            message: "Comment not found",
          },
          404,
        );
      }

      if (error.message === "FORBIDDEN") {
        return c.json(
          {
            message: "You are not allowed to modify this comment",
          },
          403,
        );
      }
    }

    throw error;
  }
}

export async function deleteComment(c: Context) {
  const user = c.get("user");
  const commentId = c.req.param("id");

  try {
    const result = await commentService.deleteComment(
      commentId as string,
      user.id,
    );

    return c.json(result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "COMMENT_NOT_FOUND") {
        return c.json(
          {
            message: "Comment not found",
          },
          404,
        );
      }

      if (error.message === "FORBIDDEN") {
        return c.json(
          {
            message: "You are not allowed to delete this comment",
          },
          403,
        );
      }
    }

    throw error;
  }
}
