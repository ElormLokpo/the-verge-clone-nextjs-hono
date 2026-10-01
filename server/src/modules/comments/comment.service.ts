import {
  asc,
  eq,
} from "drizzle-orm";

import { db } from "../../db";
import {
  comments,
  posts,
  users,
} from "../../db/schema";

export async function createComment(
  postId: string,
  authorId: string,
  body: string,
) {
  const post = await db
    .select({
      id: posts.id,
    })
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1);

  if (!post[0]) {
    throw new Error("POST_NOT_FOUND");
  }

  const [comment] = await db
    .insert(comments)
    .values({
      postId,
      authorId,
      body,
    })
    .returning();

  return comment;
}

export async function getCommentsByPost(
  postId: string,
) {
  const result = await db
    .select({
      id: comments.id,
      body: comments.body,

      author: {
        id: users.id,
        name: users.name,
       
      },

      createdAt: comments.createdAt,
      updatedAt: comments.updatedAt,
    })
    .from(comments)
    .innerJoin(
      users,
      eq(comments.authorId, users.id),
    )
    .where(eq(comments.postId, postId))
    .orderBy(asc(comments.createdAt));

  return result;
}

export async function getCommentById(
  commentId: string,
) {
  const result = await db
    .select()
    .from(comments)
    .where(eq(comments.id, commentId))
    .limit(1);

  return result[0] ?? null;
}

export async function updateComment(
  commentId: string,
  authorId: string,
  body: string,
) {
  const existingComment =
    await getCommentById(commentId);

  if (!existingComment) {
    throw new Error("COMMENT_NOT_FOUND");
  }

  if (existingComment.authorId !== authorId) {
    throw new Error("FORBIDDEN");
  }

  const [updatedComment] = await db
    .update(comments)
    .set({
      body,
      updatedAt: new Date(),
    })
    .where(eq(comments.id, commentId))
    .returning();

  return updatedComment;
}

export async function deleteComment(
  commentId: string,
  authorId: string,
) {
  const existingComment =
    await getCommentById(commentId);

  if (!existingComment) {
    throw new Error("COMMENT_NOT_FOUND");
  }

  if (existingComment.authorId !== authorId) {
    throw new Error("FORBIDDEN");
  }

  await db
    .delete(comments)
    .where(eq(comments.id, commentId));

  return {
    message: "Comment deleted successfully",
  };
}