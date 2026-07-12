import type { Slot } from "@/shared/types/planner.types";

export const DAY_NAMES: Record<number, string> = {
	2: "Segunda",
	3: "Terça",
	4: "Quarta",
	5: "Quinta",
	6: "Sexta",
};

const TURN_BASE: Record<string, number> = { M: 5, T: 11, N: 17 };

export function pad(n: number): string {
	return `${String(n).padStart(2, "0")}:00`;
}

export function parseHorario(str: string): Slot[] {
	const slots: Slot[] = [];

	for (const tok of str.trim().split(/\s+/)) {
		const match = tok.match(/^(\d+)([MTN])(\d+)$/);
		if (!match) {
			continue;
		}

		const days = [...match[1]].map(Number);
		const base = TURN_BASE[match[2]];
		const hours = [...match[3]]
			.map((position) => base + Number(position))
			.sort((a, b) => a - b);

		const runs: Array<[number, number]> = [];
		let start = hours[0];
		let prev = hours[0];
		for (let i = 1; i < hours.length; i++) {
			if (hours[i] === prev + 1) {
				prev = hours[i];
			} else {
				runs.push([start, prev + 1]);
				start = hours[i];
				prev = hours[i];
			}
		}
		runs.push([start, prev + 1]);

		for (const day of days) {
			if (day >= 2 && day <= 6) {
				for (const [from, to] of runs) {
					slots.push({ day, start: from, end: to });
				}
			}
		}
	}

	return slots;
}

export function fmtHorario(str: string): string {
	const byDay: Record<number, string[]> = {};

	for (const slot of parseHorario(str)) {
		const ranges = byDay[slot.day] ?? [];
		ranges.push(`${pad(slot.start)}–${pad(slot.end)}`);
		byDay[slot.day] = ranges;
	}

	return Object.entries(byDay)
		.map(([day, ranges]) => {
			const label = DAY_NAMES[Number(day)].slice(0, 3);
			return `${label} ${ranges.join(", ")}`;
		})
		.join(" · ");
}
