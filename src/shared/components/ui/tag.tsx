import type { SubjectType } from "@/shared/types/planner.types";
import { cn } from "@/shared/utils/cn";

interface TagProps {
	type: SubjectType;
}

export function Tag({ type }: TagProps) {
	const isRequired = type === "OB";

	return (
		<span
			className={cn(
				"cond shrink-0 rounded-bp px-1.5 py-px font-bold text-2xs uppercase tracking-wider",
				isRequired
					? "bg-tag-ob-bg text-tag-ob-tx"
					: "bg-tag-op-bg text-tag-op-tx",
			)}
		>
			{isRequired ? "Obrigatória" : "Optativa"}
		</span>
	);
}
