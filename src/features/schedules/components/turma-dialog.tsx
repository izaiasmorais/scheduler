import { useState } from "react";
import { getSubject } from "@/features/subjects/data/subjects";
import { Button } from "@/shared/components/ui/button";
import { Dialog } from "@/shared/components/ui/dialog";
import { toast } from "@/shared/hooks/use-toast";
import { fmtHorario } from "@/shared/lib/horario";
import { usePlannerStore } from "@/shared/stores/planner-store";
import type { Subject } from "@/shared/types/planner.types";
import { cn } from "@/shared/utils/cn";

interface TurmaDialogProps {
	code: string | null;
	onClose: () => void;
}

interface TurmaDialogBodyProps {
	subject: Subject;
	activeName: string;
	onClose: () => void;
}

function TurmaDialogBody({
	subject,
	activeName,
	onClose,
}: TurmaDialogBodyProps) {
	const [selected, setSelected] = useState(subject.turmas[0].t);
	const [error, setError] = useState("");
	const addItem = usePlannerStore((state) => state.addItem);

	function handleConfirm() {
		const conflict = addItem(subject.code, selected);
		if (conflict) {
			setError(conflict);
			return;
		}
		onClose();
		toast(`${subject.name} adicionada em "${activeName}"`);
	}

	return (
		<>
			<p className="cond mt-1.5 mb-1.75 font-bold text-2xs text-muted uppercase tracking-widest">
				Turma
			</p>

			{subject.turmas.map((turma) => (
				<label
					key={turma.t}
					className={cn(
						"mb-1.5 flex cursor-pointer items-start gap-2.5 rounded-bp bg-panel px-3 py-2.25 shadow-card hover:bg-panel2 dark:bg-panel2",
						selected === turma.t && "ring-1 ring-blue3",
					)}
				>
					<input
						type="radio"
						name="turma"
						value={turma.t}
						checked={selected === turma.t}
						onChange={() => setSelected(turma.t)}
						className="mt-0.75 accent-blue3"
					/>
					<span className="flex-1">
						<b className="block font-medium text-sm">
							Turma {turma.t} — {turma.doc}
						</b>
						<span className="block text-muted text-xs">
							{fmtHorario(turma.h)} · {turma.vg} vagas
						</span>
					</span>
				</label>
			))}

			{error ? (
				<div className="mt-2.5 rounded-bp bg-red3 px-3 py-2.25 font-medium text-white text-xs shadow-intent">
					{error}
				</div>
			) : null}

			<div className="mt-3.5 flex justify-end gap-2">
				<Button onClick={onClose}>Cancelar</Button>
				<Button variant="primary" onClick={handleConfirm}>
					Adicionar
				</Button>
			</div>
		</>
	);
}

export function TurmaDialog({ code, onClose }: TurmaDialogProps) {
	const subject = code ? getSubject(code) : undefined;
	const activeName = usePlannerStore((state) => {
		const sched = state.schedules.find((s) => s.id === state.active);
		return sched?.name ?? "";
	});

	if (!subject) {
		return null;
	}

	return (
		<Dialog
			open
			onClose={onClose}
			title={subject.name}
			subtitle={`${subject.code} · será adicionada em "${activeName}" — escolha a turma`}
		>
			<TurmaDialogBody
				key={subject.code}
				subject={subject}
				activeName={activeName}
				onClose={onClose}
			/>
		</Dialog>
	);
}
