import { X } from "lucide-react";
import type { Occupant } from "@/features/schedules/utils/occupancy";
import { getSubject } from "@/features/subjects/data/subjects";
import { colorOf } from "@/features/subjects/utils/color-of";
import { shortName } from "@/features/subjects/utils/short-name";
import { pad } from "@/shared/lib/horario";
import { cn } from "@/shared/utils/cn";

interface ScheduleBlockProps {
	occupant: Occupant;
	hour: number;
	onRemove: (code: string) => void;
}

export function ScheduleBlock({
	occupant,
	hour,
	onRemove,
}: ScheduleBlockProps) {
	const subject = getSubject(occupant.code);
	const single = occupant.end - occupant.start === 1;
	const isStart = occupant.start === hour;
	const isEnd = occupant.end === hour + 1;

	return (
		<div
			className={cn(
				"group relative flex h-full flex-col gap-px overflow-hidden px-2.25 py-1.5 text-white",
				colorOf(occupant.code),
				single && "block-grad rounded-bp shadow-block",
				!single && isStart && "block-grad rounded-t-bp shadow-block-start",
				!single && !isStart && !isEnd && "shadow-block-mid",
				!single && isEnd && "rounded-b-bp shadow-block-end",
			)}
		>
			{isStart ? (
				<>
					<span className="font-bold text-xs leading-tight">
						{subject ? shortName(subject.name) : occupant.code}
					</span>
					<span className="cond text-2xs opacity-85 tabular-nums">
						T{occupant.turma} · {pad(occupant.start)}–{pad(occupant.end)}
					</span>
					<button
						type="button"
						aria-label="Remover deste cronograma"
						title="Remover deste cronograma"
						onClick={() => onRemove(occupant.code)}
						className="absolute top-1 right-1.25 hidden size-4.5 items-center justify-center rounded-bp bg-black/35 text-white hover:bg-black/60 group-hover:flex"
					>
						<X className="size-3" />
					</button>
				</>
			) : null}
		</div>
	);
}
