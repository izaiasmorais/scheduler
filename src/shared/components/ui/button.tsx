import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
	"inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-bp border-0 font-medium text-xs transition-colors disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"bg-btn btn-grad text-text shadow-btn hover:bg-bp-lg1 hover:shadow-btn-h dark:hover:bg-navy-input-h",
				primary:
					"bg-blue3 block-grad text-white shadow-intent hover:bg-blue2 active:bg-blue1",
				subtle: "bg-transparent text-muted hover:bg-muted/15 hover:text-text",
			},
			size: {
				default: "px-3 py-1.5",
				sm: "px-2.5 py-1",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

type ButtonProps = ComponentProps<"button"> &
	VariantProps<typeof buttonVariants>;

export function Button({
	className,
	variant,
	size,
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			data-slot="button"
			data-variant={variant}
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

export { buttonVariants };
