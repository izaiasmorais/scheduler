export const DAYS = [2, 3, 4, 5, 6];

export const HOURS: number[] = (() => {
	const hours: number[] = [];
	for (let hour = 6; hour <= 17; hour++) {
		hours.push(hour);
	}
	return hours;
})();

export const TURNO_LABEL: Record<number, string> = {
	6: "Manhã · 06:00–12:00",
	12: "Tarde · 12:00–18:00",
};
