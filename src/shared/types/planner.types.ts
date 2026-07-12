export type SubjectType = "OB" | "OP";

export interface Turma {
	t: string;
	doc: string;
	vg: number;
	h: string;
}

export interface Subject {
	code: string;
	name: string;
	type: SubjectType;
	done: boolean;
	turmas: Turma[];
}

export interface ScheduleItem {
	code: string;
	turma: string;
}

export interface Schedule {
	id: string;
	name: string;
	items: ScheduleItem[];
}

export interface Slot {
	day: number;
	start: number;
	end: number;
}

export type Theme = "light" | "dark";
