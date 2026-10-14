import { useRouter } from "next/navigation";
import { useAuthStore } from "../store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateCommentRequest } from "../types";
import { api } from "../api";
import { API_ROUTES } from "../constants";
import { toast } from "sonner";
import { queryClient } from "../providers/query-provider";

export const useGetComments = (postId: string) => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: async () => await api.get(`${API_ROUTES.comments}/${postId}`),
    refetchOnWindowFocus: false,
  });
};

export const useCreateComment = (slug: string) => {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateCommentRequest) =>
      api.post(API_ROUTES.comments, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      toast.success("You just made a comment");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: [`${slug}`] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      router.refresh();
    },

    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });
};


export const useUpdateComment = () => {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  return useMutation({
    mutationFn: async (variables: { id: string; data: { body: string } }) => {
      const { id, data } = variables;

      return api.patch(`${API_ROUTES.comments}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      toast.success("Comment update successful");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    
    },

    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });
};

export const useDeleteComment = () => {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  return useMutation({
    mutationFn: async (id: string) =>
      api.delete(`${API_ROUTES.comments}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });
};