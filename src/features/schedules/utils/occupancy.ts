import { getSubject } from "@/features/subjects/data/subjects";
import { DAY_NAMES, pad, parseHorario } from "@/shared/lib/horario";
import type { Schedule } from "@/shared/types/planner.types";

export interface Occupant {
	code: string;
	turma: string;
	start: number;
	end: number;
}

export function buildOccupancy(sched: Schedule): Record<string, Occupant> {
	const map: Record<string, Occupant> = {};

	for (const item of sched.items) {
		const subject = getSubject(item.code);
		if (!subject) {
			continue;
		}

		const turma =
			subject.turmas.find((t) => t.t === item.turma) ?? subject.turmas[0];

		for (const slot of parseHorario(turma.h)) {
			for (let hour = slot.start; hour < slot.end; hour++) {
				map[`${slot.day}-${hour}`] = {
					code: item.code,
					turma: item.turma,
					start: slot.start,
					end: slot.end,
				};
			}
		}
	}

	return map;
}

export function findConflict(
	sched: Schedule,
	code: string,
	turma: string,
): string | null {
	const subject = getSubject(code);
	if (!subject) {
		return "Matéria não encontrada.";
	}

	if (sched.items.some((item) => item.code === code)) {
		return `${subject.name} já está em "${sched.name}".`;
	}

	const selected =
		subject.turmas.find((t) => t.t === turma) ?? subject.turmas[0];
	const occupancy = buildOccupancy(sched);

	for (const slot of parseHorario(selected.h)) {
		for (let hour = slot.start; hour < slot.end; hour++) {
			const hit = occupancy[`${slot.day}-${hour}`];
			if (hit) {
				const other = getSubject(hit.code);
				const day = DAY_NAMES[slot.day];
				const range = `${pad(hour)}–${pad(hour + 1)}`;
				const name = other?.name ?? hit.code;
				return `Conflito: ${day} ${range} já ocupado por ${name} em "${sched.name}".`;
			}
		}
	}

	return null;
}
