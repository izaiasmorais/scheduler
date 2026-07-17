import { Eye, EyeOff } from "lucide-react";
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
				<h3
					title={subject.name}
					className={cn(
						"truncate font-medium text-sm leading-snug",
						mode === "done" && "line-through decoration-faint",
					)}
				>
					{subject.name}
				</h3>
				<div className="mt-px truncate text-muted text-xs tabular-nums">
					{horario}
				</div>
			</div>

			<div className="flex w-22 shrink-0 items-center">
				<Tag type={subject.type} />
			</div>

			<div className="flex w-22 shrink-0 flex-wrap items-center gap-1">
				{chips.length > 0 ? (
					chips.map((chip) => <Chip key={chip} label={chip} />)
				) : (
					<span className="text-faint text-xs">-</span>
				)}
			</div>

			<div className="flex w-30 shrink-0 items-center justify-end gap-1.5">
				{mode === "pend" ? (
					<>
						<button
							type="button"
							title="Ocultar da lista"
							aria-label="Ocultar da lista"
							onClick={() => onHide(subject.code)}
							className="flex cursor-pointer items-center justify-center rounded-bp p-1.5 text-muted transition-colors hover:bg-muted/15 hover:text-text"
						>
							<Eye className="size-4" />
						</button>
						<Button variant="primary" onClick={() => onAdd(subject.code)}>
							Adicionar
						</Button>
					</>
				) : null}
				{mode === "hidden" ? (
					<button
						type="button"
						title="Mostrar na lista"
						aria-label="Mostrar na lista"
						onClick={() => onShow(subject.code)}
						className="flex cursor-pointer items-center justify-center rounded-bp p-1.5 text-muted transition-colors hover:bg-muted/15 hover:text-text"
					>
						<EyeOff className="size-4" />
					</button>
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
