"use client"
import { useMutation } from "@tanstack/react-query"
import { api } from "../api"
import { AuthResponseType, LoginUserRequest, RegisterUserRequest, VerifyEmailRequest } from "../types"
import { API_ROUTES } from "../constants"
import { toast } from "sonner"
import { useAuthStore } from "../store"
import { useRouter } from "next/navigation"



export const useRegisterUser = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const router = useRouter();


    return useMutation({
        mutationFn: async (data: RegisterUserRequest): Promise<AuthResponseType> => api.post(API_ROUTES.register, data),
        onSuccess: (data: AuthResponseType) => {
            console.log("success", data)

            setAuth(data.user, data.token)
            toast.success("Account created successfully");
            router.push("/auth/verify-email");

        },
        onError: (error) => {
            toast.error("Something went wrong. Please try again later");
        }
    })
}

export const useVerifyEmail = () => {
    const token = useAuthStore((state) => state.token);
    const router = useRouter();


    return useMutation({
        mutationFn: async (data: VerifyEmailRequest) => api.post(API_ROUTES.verifyEmail, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((data) => console.log(data)),
        onSuccess: () => {
            toast.success("Email verified successfully");
            router.push("/")
        },
        onError: (error) => {
            toast.error("Something went wrong. Please try again later");
        }
    })
}


export const useLoginUser = () => {
    return useMutation({
        mutationFn: async (data: LoginUserRequest) => api.post(API_ROUTES.login, data).then((data) => console.log(data)),
        onSuccess: () => {
            toast.success("Logged in successful");
        },
        onError: (error) => {
            toast.error("Something went wrong. Please try again later");
        }
    })
}