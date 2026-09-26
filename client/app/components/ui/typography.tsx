import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

const typographyVariants = cva("text-stone-700",
    {
        variants: {
            variant: {
                "heading-5": "font-['polySans',_'polySans_Fallback',_Helvetica,_Arial,_sans-serif] font-bold not-italic text-black text-[28px] leading-[28px] ",
                "regular": "font-['polySans',_'polySans_Fallback',_Helvetica,_Arial,_sans-serif] font-normal not-italic text-[#4a4a4a] text-[14px] leading-[17px]"
            },
            size: {}
        },
        defaultVariants: {
            variant: 'regular'
        }
    }
)


export interface ITypographyProps
    extends VariantProps<typeof typographyVariants> {
    className?: string;
    children?: React.ReactNode;
    text?: string;
}

export function Typography({
    className,
    variant,
    size,
    text,
    children,

}: ITypographyProps) {
    return (
        <span
            className={cn(typographyVariants({ variant, size }), className)}

        >
            {text ?? children}
        </span>
    );
}