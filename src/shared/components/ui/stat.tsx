import { cn } from "@/shared/utils/cn";

type StatTone = "default" | "warn" | "good";

interface StatProps {
	value: number | string;
	label: string;
	tone?: StatTone;
}

export function Stat({ value, label, tone = "default" }: StatProps) {
	return (
		<div className="min-w-22 rounded-bp bg-navy-panel px-3.5 py-1.5 text-center shadow-stat-inset">
			<b
				className={cn(
					"block font-bold text-lg leading-tight tabular-nums",
					tone === "warn" && "text-blue5",
					tone === "good" && "text-positive",
					tone === "default" && "text-on-navy",
				)}
			>
				{value}
			</b>
			<span className="cond font-bold text-2xs text-on-navy-muted uppercase tracking-widest">
				{label}
			</span>
		</div>
	);
}
