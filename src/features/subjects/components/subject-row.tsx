import { colorOf } from "@/features/subjects/utils/color-of";
import { Button } from "@/shared/components/ui/button";
import { Chip } from "@/shared/components/ui/chip";
import { ColorDot } from "@/shared/components/ui/color-dot";
import { Tag } from "@/shared/components/ui/tag";
import { fmtHorario } from "@/shared/lib/horario";
import type { Subject } from "@/shared/types/planner.types";
import { cn } from "@/shared/utils/cn";

export type RowMode = "pend" | "hidden" | "done";

interface SubjectRowProps {
	subject: Subject;
	mode: RowMode;
	chips: string[];
	onAdd: (code: string) => void;
	onHide: (code: string) => void;
	onShow: (code: string) => void;
	onUndone: (code: string) => void;
}

export function SubjectRow({
	subject,
	mode,
	chips,
	onAdd,
	onHide,
	onShow,
	onUndone,
}: SubjectRowProps) {
	const horario =
		subject.turmas.length > 1
			? `${subject.turmas.length} turmas · Sex 08:00–12:00`
			: fmtHorario(subject.turmas[0].h);

	return (
		<div
			className={cn(
				"mb-1.5 flex items-center gap-2.5 rounded-bp bg-panel px-2.5 py-1.75 shadow-card dark:bg-panel2",
				mode !== "pend" && "opacity-55",
			)}
		>
			<ColorDot colorClass={colorOf(subject.code)} />

			<div className="min-w-0 flex-1">
				<div className="flex min-w-0 items-center gap-1.75">
					<h3
						title={subject.name}
						className={cn(
							"truncate font-medium text-sm leading-snug",
							mode === "done" && "line-through decoration-faint",
						)}
					>
						{subject.name}
					</h3>
					<Tag type={subject.type} />
				</div>
				<div className="mt-px flex items-center gap-1.5 truncate text-muted text-xs tabular-nums">
					<span className="truncate">{horario}</span>
					{chips.map((chip) => (
						<Chip key={chip} label={chip} />
					))}
				</div>
			</div>

			<div className="flex shrink-0 gap-1.5">
				{mode === "pend" ? (
					<>
						<Button
							variant="subtle"
							title="Ocultar da lista"
							onClick={() => onHide(subject.code)}
						>
							Ocultar
						</Button>
						<Button variant="primary" onClick={() => onAdd(subject.code)}>
							Adicionar
						</Button>
					</>
				) : null}
				{mode === "hidden" ? (
					<Button variant="subtle" onClick={() => onShow(subject.code)}>
						Mostrar
					</Button>
				) : null}
				{mode === "done" ? (
					<Button
						variant="subtle"
						title="Voltar para pendentes"
						onClick={() => onUndone(subject.code)}
					>
						Desmarcar
					</Button>
				) : null}
			</div>
		</div>
	);
}
