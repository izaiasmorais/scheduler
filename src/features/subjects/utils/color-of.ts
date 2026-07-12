import { SUBJECTS } from "@/features/subjects/data/subjects";

export function colorOf(code: string): string {
	const index = SUBJECTS.findIndex((subject) => subject.code === code);
	const normalized = ((index % 12) + 12) % 12;
	return `subject-c${normalized}`;
}
