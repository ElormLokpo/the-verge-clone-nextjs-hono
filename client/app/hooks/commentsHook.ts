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
    queryFn: async () => await api.get(`${API_ROUTES.getComments}${postId}`),
    refetchOnWindowFocus: false,
  });
};

export const useCreateComment = (slug: string) => {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateCommentRequest) =>
      api.post(API_ROUTES.createComment, data, {
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
