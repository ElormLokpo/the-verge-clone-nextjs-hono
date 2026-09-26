

"use client"
import { Input } from "@/app/components/ui/input";
import { Typography } from "@/app/components/ui/typography"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const ResetPasswordPage = () => {

    return (
        <div className="bg-white w-132 py-10 px-3">
            <div className="flex flex-col gap-3 items-center">
                <div className="flex justify-center items-center gap-3 mb-3 w-[20rem]">
                    <Typography variant="heading-5" className="text-center">
                        <div className="flex flex-col">
                            <span>Reset Password</span>

                        </div>
                    </Typography>
                </div>

                <div className="w-[20rem] flex justify-center items-center mb-4">
                    <Typography variant="regular" text="Kindly enter your new password to reset your password" className="text-center" />
                </div>

            </div>

            <div className="px-16 mb-4">
                <ResetPasswordForm />
            </div>


        </div>
    )
}



const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: z.string().min(1, "Please confirm your password"),

    })


type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;


const ResetPasswordForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: ResetPasswordValues) => {
        console.log("data", data)

    };

    return (
        <div className=" w-full ">


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>



                <Input<ResetPasswordValues>
                    name="password"
                    type="password"
                    label="Password:"
                    placeholder="Enter password"
                    register={register}
                    errors={errors}
                />

                <div className="text-xs mb-5">Password must be at least 8 characaters and contain at least one uppercase letter and a number</div>

                <Input<ResetPasswordValues>
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password:"
                    placeholder="Confirm password"
                    register={register}
                    errors={errors}
                />


                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full bg-indigo-600 hover:bg-black px-4 py-3.5 font-polysans text-sm font-medium text-white transition-colors focus:outline-none disabled:opacity-50"
                >
                    {isSubmitting ? "Verifying..." : "Verify email"}
                </button>
            </form>
        </div>
    )
}

export default ResetPasswordPage;