
"use client"
import { Input } from "@/app/components/ui/input";
import { Typography } from "@/app/components/ui/typography"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Link from "next/link";


export default function Auth() {
    return (

        <div>
            <AuthForm />
        </div>

    );
}



export const AuthForm = () => {
    const [currentForm, setCurrentForm] = useState<string>("signUp");

    return (
        <div className="bg-white w-132 py-10 px-3">
            <div className="flex flex-col gap-3 items-center">
                <div className="flex justify-center items-center gap-3 mb-3 w-[20rem]">
                    <Typography variant="heading-5" className="text-center">
                        <div className="flex flex-col">
                            <span>Sign in or</span>
                            <span>create an account</span>
                        </div>
                    </Typography>
                </div>

                <div className="w-[20rem] flex justify-center items-center mb-4">
                    <Typography variant="regular" text="This email will be used to sign into Vox Media sites. By submitting your email, you agree to our Terms and Privacy Policy to receive email correspondence from us." className="text-center" />
                </div>

            </div>

            <div className="px-16 mb-4">
                {currentForm == "signUp" ? <SignUpForm /> : <SignInForm />}
            </div>

            <div className="px-16 mb-4">
                <button


                    className="mt-2 w-full border border-stone-600 hover:bg-stone-100 px-4 py-3.5 font-polysans text-sm font-medium  transition-colors focus:outline-none disabled:opacity-50"
                >
                    <span className="flex gap-2 items-center justify-center">
                        <span>
                            <FcGoogle size={20} />
                        </span>

                        <span>Sign In With Google</span>
                    </span>
                </button>
            </div>

            <div className="flex justify-center items-center">
                {currentForm == "signUp" ? <span className="text-xs">Already have an account? <span className="underline hover:cursor-pointer" onClick={() => setCurrentForm("signIn")}>Sign In</span></span>
                    :
                    <span className="text-xs">Dont have a account? <span className="underline hover:cursor-pointer" onClick={() => setCurrentForm("signUp")}>Sign Up</span></span>
                }
            </div>

        </div>
    )
}


const signUpSchema = z
    .object({
        name: z
            .string()
            .min(3, "Name must be at least 3 characters")
            .max(20, "Name must not exceed 20 characters"),
        email: z
            .email("Please enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: SignUpFormValues) => {
        console.log("data", data)

    };

    return (
        <div className=" w-full ">


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

                <Input<SignUpFormValues>
                    name="name"
                    label="Full Name:"

                    register={register}
                    errors={errors}
                />


                <Input<SignUpFormValues>
                    name="email"
                    type="email"
                    label="Email Address:"
                    placeholder="john@example.com"
                    register={register}
                    errors={errors}
                />


                <Input<SignUpFormValues>
                    name="password"
                    type="password"
                    label="Password:"
                    placeholder="Enter password"
                    register={register}
                    errors={errors}
                />

                <div className="text-xs mb-5">Password must be at least 8 characaters and contain at least one uppercase letter and a number</div>

                <Input<SignUpFormValues>
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password:"
                    placeholder="Confirm password"
                    register={register}
                    errors={errors}
                />

                <div className="text-right">
                    <Link href="/auth/forgot-password" className="text-sm hover:underline">Forgot Password?</Link>
                </div>



                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full bg-indigo-600 hover:bg-black px-4 py-3.5 font-polysans text-sm font-medium text-white transition-colors focus:outline-none disabled:opacity-50"
                >
                    {isSubmitting ? "Creating Account..." : "Sign Up"}
                </button>
            </form>
        </div>
    )
}



const signInSchema = z
    .object({

        email: z
            .email("Please enter a valid email address"),
        password: z
            .string()
            .min(1, "Password is required")


    })


type SignInFormValues = z.infer<typeof signInSchema>;


const SignInForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {

            email: "",
            password: "",


        },
    });

    const onSubmit = async (data: SignInFormValues) => {
        console.log("data", data)

    };

    return (
        <div className=" w-full ">


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

                <Input<SignInFormValues>
                    name="email"
                    type="email"
                    label="Email Address:"
                    placeholder="john@example.com"
                    register={register}
                    errors={errors}
                />

                <Input<SignInFormValues>
                    name="password"
                    type="password"
                    label="Password:"
                    placeholder="Enter your password"
                    register={register}
                    errors={errors}
                />

                 <div className="text-right">
                    <Link href="/auth/forgot-password" className="text-sm hover:underline">Forgot Password?</Link>
                </div>



                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full bg-indigo-600 hover:bg-black px-4 py-3.5 font-polysans text-sm font-medium text-white transition-colors focus:outline-none disabled:opacity-50"
                >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </div>
    )
}