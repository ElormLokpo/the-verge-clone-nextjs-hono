import type { Context } from "hono";

import {
    createPostSchema,
    updatePostSchema,
} from "../../config/validators";

import * as postService from "./post.service";

export async function createPost(c: Context) {
    const user = c.get("user");

    const body = await c.req.json();

    const parsed =
        createPostSchema.safeParse(body);

    if (!parsed.success) {
        return c.json(
            {
                message: "Invalid request body",
                errors: parsed.error.flatten(),
            },
            400,
        );
    }

    const post = await postService.createPost(
        user.id,
        parsed.data,
    );

    return c.json(
        {
            data: post,
        },
        201,
    );
}

export async function getPosts(c: Context) {
    const posts = await postService.getPosts();

    return c.json({
        data: posts,
    });
}

export async function getPost(c: Context) {
    const slug = c.req.param("slug");

    const post =
        await postService.getPostBySlug(slug as string);

    if (!post) {
        return c.json(
            {
                message: "Post not found",
            },
            404,
        );
    }

    return c.json({
        data: post,
    });
}

export async function updatePost(c: Context) {
    const user = c.get("user");
    const postId = c.req.param("id");

    const body = await c.req.json();

    const parsed =
        updatePostSchema.safeParse(body);

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
        const post =
            await postService.updatePost(
                postId as string,
                user.id,
                parsed.data,
            );

        return c.json({
            data: post,
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "POST_NOT_FOUND") {
                return c.json(
                    {
                        message: "Post not found",
                    },
                    404,
                );
            }

            if (error.message === "FORBIDDEN") {
                return c.json(
                    {
                        message:
                            "You are not allowed to modify this post",
                    },
                    403,
                );
            }
        }

        throw error;
    }
}

export async function deletePost(c: Context) {
    const user = c.get("user");
    const postId = c.req.param("id");

    try {
        const result =
            await postService.deletePost(
                postId as string,
                user.id,
            );

        return c.json(result);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "POST_NOT_FOUND") {
                return c.json(
                    {
                        message: "Post not found",
                    },
                    404,
                );
            }

            if (error.message === "FORBIDDEN") {
                return c.json(
                    {
                        message:
                            "You are not allowed to delete this post",
                    },
                    403,
                );
            }
        }

        throw error;
    }
}