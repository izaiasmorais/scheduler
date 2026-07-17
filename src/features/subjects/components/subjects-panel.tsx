import { useState } from "react";
import { TurmaDialog } from "@/features/schedules/components/turma-dialog";
import { SubjectList } from "@/features/subjects/components/subject-list";
import { SubjectSearch } from "@/features/subjects/components/subject-search";
import { getSubject } from "@/features/subjects/data/subjects";
import { toast } from "@/shared/hooks/use-toast";
import { usePlannerStore } from "@/shared/stores/planner-store";

export function SubjectsPanel() {
	const [query, setQuery] = useState("");
	const [dialogCode, setDialogCode] = useState<string | null>(null);
	const addItem = usePlannerStore((state) => state.addItem);

	function handleAdd(code: string) {
		const subject = getSubject(code);
		if (!subject) {
			return;
		}

		if (subject.turmas.length > 1) {
			setDialogCode(code);
			return;
		}

		const error = addItem(code, subject.turmas[0].t);
		if (error) {
			toast(error, true);
			return;
		}

		const { schedules, active } = usePlannerStore.getState();
		const activeName = schedules.find((s) => s.id === active)?.name ?? "";
		toast(`${subject.name} adicionada em "${activeName}"`);
	}

	return (
		<aside className="flex w-152 min-w-152 flex-col border-line border-r bg-panel max-lg:h-auto max-lg:max-h-[46vh] max-lg:w-full max-lg:min-w-0">
			<SubjectSearch value={query} onChange={setQuery} />
			<SubjectList query={query} onAdd={handleAdd} />
			<TurmaDialog code={dialogCode} onClose={() => setDialogCode(null)} />
		</aside>
	);
}
