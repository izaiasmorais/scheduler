interface ChipProps {
	label: string;
}

export function Chip({ label }: ChipProps) {
	return (
		<span className="cond shrink-0 rounded-bp bg-chip-bg px-1.5 py-px font-bold text-2xs text-chip-tx uppercase tracking-wide">
			{label}
		</span>
	);
}
