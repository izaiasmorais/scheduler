import {
	type RowMode,
	SubjectRow,
} from "@/features/subjects/components/subject-row";
import { SubjectSection } from "@/features/subjects/components/subject-section";
import { SUBJECTS } from "@/features/subjects/data/subjects";
import { usePlannerStore } from "@/shared/stores/planner-store";
import type { Subject } from "@/shared/types/planner.types";

interface SubjectListProps {
	query: string;
	onAdd: (code: string) => void;
}

export function SubjectList({ query, onAdd }: SubjectListProps) {
	const done = usePlannerStore((state) => state.done);
	const hidden = usePlannerStore((state) => state.hidden);
	const schedules = usePlannerStore((state) => state.schedules);
	const hide = usePlannerStore((state) => state.hide);
	const show = usePlannerStore((state) => state.show);
	const setDone = usePlannerStore((state) => state.setDone);

	const normalized = query.trim().toLowerCase();
	const matches = (subject: Subject) =>
		!normalized ||
		subject.name.toLowerCase().includes(normalized) ||
		subject.code.toLowerCase().includes(normalized);

	const pendingRequired = SUBJECTS.filter(
		(s) => !done[s.code] && !hidden[s.code] && s.type === "OB" && matches(s),
	);
	const pendingOptional = SUBJECTS.filter(
		(s) => !done[s.code] && !hidden[s.code] && s.type === "OP" && matches(s),
	);
	const hiddenSubjects = SUBJECTS.filter(
		(s) => !done[s.code] && hidden[s.code] && matches(s),
	);
	const doneSubjects = SUBJECTS.filter((s) => done[s.code] && matches(s));

	const chipsFor = (code: string) =>
		schedules
			.filter((s) => s.items.some((i) => i.code === code))
			.map((s) => s.name);

	const renderRow = (subject: Subject, mode: RowMode) => (
		<SubjectRow
			key={subject.code}
			subject={subject}
			mode={mode}
			chips={chipsFor(subject.code)}
			onAdd={onAdd}
			onHide={hide}
			onShow={show}
			onUndone={(code) => setDone(code, false)}
		/>
	);

	return (
		<div className="flex-1 overflow-y-auto px-3 pt-1 pb-8">
			<SubjectSection
				label="Obrigatórias pendentes"
				count={pendingRequired.length}
				emptyNote="Nenhuma visível."
			>
				{pendingRequired.map((subject) => renderRow(subject, "pend"))}
			</SubjectSection>

			<SubjectSection
				label="Optativas disponíveis"
				count={pendingOptional.length}
				emptyNote="Nenhuma visível com esse filtro."
			>
				{pendingOptional.map((subject) => renderRow(subject, "pend"))}
			</SubjectSection>

			{hiddenSubjects.length > 0 ? (
				<SubjectSection label="Ocultas" count={hiddenSubjects.length}>
					{hiddenSubjects.map((subject) => renderRow(subject, "hidden"))}
				</SubjectSection>
			) : null}

			<SubjectSection
				label="Já pagas"
				count={doneSubjects.length}
				emptyNote="Nada aqui ainda."
			>
				{doneSubjects.map((subject) => renderRow(subject, "done"))}
			</SubjectSection>
		</div>
	);
}
