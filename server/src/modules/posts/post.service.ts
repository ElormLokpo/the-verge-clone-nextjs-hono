import { and, desc, eq, sql } from "drizzle-orm";

import { db } from "../../db";
import { comments, posts, users } from "../../db/schema";
import { CreatePostInput, UpdatePostInput } from "./post.types";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function createPost(authorId: string, input: CreatePostInput) {
  const baseSlug = createSlug(input.title);

  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;

  const [post] = await db
    .insert(posts)
    .values({
      title: input.title,
      slug,
      summary: input.summary,
      body: input.body,
      category: input.category,
      coverPhoto: input.coverPhoto ?? null,
      authorId,

      published: input.published ? new Date() : null,
    })
    .returning();

  return post;
}

export async function getPosts() {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      summary: posts.summary,
      body: posts.body,
      coverPhoto: posts.coverPhoto,
      category: posts.category,

      author: {
        id: users.id,
        name: users.name,
      },

      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,

      commentCount: sql<number>`
        count(${comments.id})
      `,
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .leftJoin(comments, eq(comments.postId, posts.id))
    .where(sql`${posts.published} IS NOT NULL`)
    .groupBy(posts.id, users.id)
    .orderBy(desc(posts.createdAt));

  return result;
}

export async function getPostBySlug(slug: string) {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      summary: posts.summary,
      body: posts.body,
      coverPhoto: posts.coverPhoto,
      category: posts.category,

      author: {
        id: users.id,
        name: users.name,
      },

      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,

      commentCount: sql<number>`
        count(${comments.id})
      `,
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .leftJoin(comments, eq(comments.postId, posts.id))
    .where(and(eq(posts.slug, slug), sql`${posts.published} IS NOT NULL`))
    .groupBy(posts.id, users.id);

  return result[0] ?? null;
}

export async function getPostById(id: string) {
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);

  return result[0] ?? null;
}

export async function updatePost(
  postId: string,
  authorId: string,
  input: UpdatePostInput,
) {
  const existingPost = await getPostById(postId);

  if (!existingPost) {
    throw new Error("POST_NOT_FOUND");
  }

  if (existingPost.authorId !== authorId) {
    throw new Error("FORBIDDEN");
  }

  const [updatedPost] = await db
    .update(posts)
    .set({
      ...input,

      published:
        input.published === true
          ? (existingPost.published ?? new Date())
          : input.published === false
            ? null
            : existingPost.published,

      updatedAt: new Date(),
    })
    .where(eq(posts.id, postId))
    .returning();

  return updatedPost;
}

export async function deletePost(postId: string, authorId: string) {
  const existingPost = await getPostById(postId);

  if (!existingPost) {
    throw new Error("POST_NOT_FOUND");
  }

  if (existingPost.authorId !== authorId) {
    throw new Error("FORBIDDEN");
  }

  await db.delete(posts).where(eq(posts.id, postId));

  return {
    message: "Post deleted successfully",
  };
}
