"use client"
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreatePostRequest, UpdatePostRequest } from "../types";
import { api } from "../api";
import { API_ROUTES, CLIENT_ROUTES } from "../constants";
import { toast } from "sonner";
import { queryClient } from "../providers/query-provider";



export const useCreatePost = () => {
    const token = useAuthStore((state) => state.token);
    const router = useRouter();
    return useMutation({
        mutationFn: async (data: CreatePostRequest) =>
            api.post(API_ROUTES.createPost, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        onSuccess: () => {
            toast.success("Post created successfully");
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            router.push(CLIENT_ROUTES.home);
        },
        onError: () => {
            toast.error("Something went wrong. Please try again later");
        },
    });
};

export const useGetPosts = () => {
    const token = useAuthStore((state) => state.token);
    return useQuery({
        queryKey: ["posts"],
        queryFn: async () =>
            api.get(API_ROUTES.getPosts, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: 1000 * 60 * 5,
    });
};

export const useGetPost = (slug: string) => {
    const token = useAuthStore((state) => state.token);
    return useQuery({
        queryKey: ["post"],
        queryFn: async () =>
            api.get(`${API_ROUTES.getPost}/${slug}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
              
            }),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: 1000 * 60 * 5,
    });
};

export const useUpdatePost = () => {
    const token = useAuthStore((state) => state.token);
    return useMutation({
        mutationFn: async (data: UpdatePostRequest) =>
            api.put(API_ROUTES.updatePost, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        onSuccess: () => {
            toast.success("Post updated successfully");
        },
        onError: () => {
            toast.error("Something went wrong. Please try again later");
        },
    });
};

export const useDeletePost = () => {
    const token = useAuthStore((state) => state.token);
    return useMutation({
        mutationFn: async (id: string) =>
            api.delete(API_ROUTES.deletePost, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    id,
                },
            }),
        onSuccess: () => {
            toast.success("Post deleted successfully");
        },
        onError: () => {
            toast.error("Something went wrong. Please try again later");
        },
    });
};      