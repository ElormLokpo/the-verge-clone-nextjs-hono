"use client"
import { Input } from "@/app/components/ui/input";
import { Typography } from "@/app/components/ui/typography"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const VerifyEmailPage = () => {

    return (
        <div className="bg-white w-132 py-10 px-3">
            <div className="flex flex-col gap-3 items-center">
                <div className="flex justify-center items-center gap-3 mb-3 w-[20rem]">
                    <Typography variant="heading-5" className="text-center">
                        <div className="flex flex-col">
                            <span>Verify Email</span>

                        </div>
                    </Typography>
                </div>

                <div className="w-[20rem] flex justify-center items-center mb-4">
                    <Typography variant="regular" text="A code was sent to your email. Kindly enter code below to verify your code" className="text-center" />
                </div>

            </div>

            <div className="px-16 mb-4">
                <VerifyEmailForm />
            </div>


        </div>
    )
}



const verifyEmailSchema = z
    .object({
        code: z
            .string()
            .min(1, "Code is required")


    })


type VerifyEmailValues = z.infer<typeof verifyEmailSchema>;


const VerifyEmailForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<VerifyEmailValues>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {

            code: ""


        },
    });

    const onSubmit = async (data: VerifyEmailValues) => {
        console.log("data", data)

    };

    return (
        <div className=" w-full ">


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>



                <Input<VerifyEmailValues>
                    name="code"
                    type="number"
                    label="Code:"
                    placeholder="Enter code sent to your email"
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

export default VerifyEmailPage;