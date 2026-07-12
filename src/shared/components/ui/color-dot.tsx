import { cn } from "@/shared/utils/cn";

interface ColorDotProps {
	colorClass: string;
}

export function ColorDot({ colorClass }: ColorDotProps) {
	return (
		<span
			className={cn("size-2.5 shrink-0 rounded-bp shadow-dot", colorClass)}
		/>
	);
}
