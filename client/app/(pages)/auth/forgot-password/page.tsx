"use client"
import { Input } from "@/app/components/ui/input";
import { Typography } from "@/app/components/ui/typography"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const ForgotPasswordPage = () => {

    return (
        <div className="bg-white w-132 py-10 px-3">
            <div className="flex flex-col gap-3 items-center">
                <div className="flex justify-center items-center gap-3 mb-3 w-[20rem]">
                    <Typography variant="heading-5" className="text-center">
                        <div className="flex flex-col">
                            <span>Forgot Password</span>

                        </div>
                    </Typography>
                </div>

                <div className="w-[20rem] flex justify-center items-center mb-4">
                    <Typography variant="regular" text="Kindly enter your email address below to receive a link to reset your password" className="text-center" />
                </div>

            </div>

            <div className="px-16 mb-4">
                <ForgotPasswordForm />
            </div>


        </div>
    )
}



const forgotPasswordSchema = z
    .object({
        email: z
            .email("Please enter a valid email address")
            


    })


type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;


const ForgotPasswordForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        },
    });

    const onSubmit = async (data: ForgotPasswordValues) => {
        console.log("data", data)

    };

    return (
        <div className=" w-full ">


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>



                <Input<ForgotPasswordValues>
                    name="email"
                    type="email"
                    label="Email Address:"
                    placeholder="john@example.com"
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

export default ForgotPasswordPage;