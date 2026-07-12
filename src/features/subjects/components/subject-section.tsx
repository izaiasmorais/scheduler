import type { ReactNode } from "react";
import { SectionTitle } from "@/shared/components/ui/section-title";

interface SubjectSectionProps {
	label: string;
	count: number;
	emptyNote?: string;
	children: ReactNode;
}

export function SubjectSection({
	label,
	count,
	emptyNote,
	children,
}: SubjectSectionProps) {
	return (
		<>
			<SectionTitle label={label} count={count} />
			{count === 0 && emptyNote ? (
				<p className="p-1 text-faint text-xs">{emptyNote}</p>
			) : (
				children
			)}
		</>
	);
}
