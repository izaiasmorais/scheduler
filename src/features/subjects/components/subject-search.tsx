import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

interface SubjectSearchProps {
	value: string;
	onChange: (value: string) => void;
}

export function SubjectSearch({ value, onChange }: SubjectSearchProps) {
	return (
		<div className="px-3 py-2.5 shadow-hairline">
			<div className="relative">
				<Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 size-3.5 text-faint" />
				<Input
					type="search"
					placeholder="Filtrar matérias…"
					autoComplete="off"
					value={value}
					onChange={(event) => onChange(event.target.value)}
					className="pl-8"
				/>
			</div>
		</div>
	);
}
