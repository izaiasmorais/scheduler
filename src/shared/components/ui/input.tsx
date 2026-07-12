import type { ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";

type InputProps = ComponentProps<"input">;

export function Input({ className, ...props }: InputProps) {
	return (
		<input
			data-slot="input"
			className={cn(
				"w-full rounded-bp bg-input px-3 py-1.5 text-sm text-text shadow-input outline-none placeholder:text-faint focus:shadow-focus",
				className,
			)}
			{...props}
		/>
	);
}
