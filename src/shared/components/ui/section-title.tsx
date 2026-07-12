interface SectionTitleProps {
	label: string;
	count: number;
}

export function SectionTitle({ label, count }: SectionTitleProps) {
	return (
		<div className="cond mx-0.5 mt-3 mb-1.5 flex items-center gap-2 font-bold text-muted text-xs uppercase tracking-widest">
			<span>{label}</span>
			<span className="text-faint tabular-nums tracking-normal">{count}</span>
			<span className="h-px flex-1 bg-line" />
		</div>
	);
}
