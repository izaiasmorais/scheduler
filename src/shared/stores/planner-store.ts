import { create } from "zustand";
import { persist } from "zustand/middleware";
import { findConflict } from "@/features/schedules/utils/occupancy";
import { getSubject, SUBJECTS } from "@/features/subjects/data/subjects";
import type { Schedule, Theme } from "@/shared/types/planner.types";

interface PlannerState {
	done: Record<string, boolean>;
	hidden: Record<string, boolean>;
	schedules: Schedule[];
	active: string;
	theme: Theme;
	uid: number;
	setDone: (code: string, value: boolean) => void;
	hide: (code: string) => void;
	show: (code: string) => void;
	addSchedule: () => Schedule;
	removeSchedule: (id: string) => void;
	renameSchedule: (id: string, name: string) => void;
	setActive: (id: string) => void;
	addItem: (code: string, turma: string) => string | null;
	removeItem: (code: string) => void;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

type PersistedState = Pick<
	PlannerState,
	"done" | "hidden" | "schedules" | "active" | "theme" | "uid"
>;

const PERSIST_KEY = "planner-2026-2";

function buildInitialDone(): Record<string, boolean> {
	return Object.fromEntries(
		SUBJECTS.map((subject) => [subject.code, subject.done]),
	);
}

function detectTheme(): Theme {
	if (
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		return "dark";
	}
	return "light";
}

export const usePlannerStore = create<PlannerState>()(
	persist(
		(set, get) => ({
			done: buildInitialDone(),
			hidden: {},
			schedules: [{ id: "s1", name: "Cronograma 1", items: [] }],
			active: "s1",
			theme: detectTheme(),
			uid: 2,

			setDone: (code, value) => {
				set((state) => ({ done: { ...state.done, [code]: value } }));
			},

			hide: (code) => {
				set((state) => ({ hidden: { ...state.hidden, [code]: true } }));
			},

			show: (code) => {
				set((state) => {
					const hidden = { ...state.hidden };
					delete hidden[code];
					return { hidden };
				});
			},

			addSchedule: () => {
				const state = get();
				const schedule: Schedule = {
					id: `s${state.uid}`,
					name: `Cronograma ${state.schedules.length + 1}`,
					items: [],
				};
				set({
					schedules: [...state.schedules, schedule],
					active: schedule.id,
					uid: state.uid + 1,
				});
				return schedule;
			},

			removeSchedule: (id) => {
				set((state) => {
					if (state.schedules.length <= 1) {
						return state;
					}
					const schedules = state.schedules.filter((s) => s.id !== id);
					const active = state.active === id ? schedules[0].id : state.active;
					return { schedules, active };
				});
			},

			renameSchedule: (id, name) => {
				const trimmed = name.trim();
				if (!trimmed) {
					return;
				}
				set((state) => ({
					schedules: state.schedules.map((s) =>
						s.id === id ? { ...s, name: trimmed } : s,
					),
				}));
			},

			setActive: (id) => {
				set({ active: id });
			},

			addItem: (code, turma) => {
				const state = get();
				const sched = state.schedules.find((s) => s.id === state.active);
				if (!sched) {
					return "Nenhum cronograma ativo.";
				}

				const conflict = findConflict(sched, code, turma);
				if (conflict) {
					return conflict;
				}

				const subject = getSubject(code);
				if (!subject) {
					return "Matéria não encontrada.";
				}

				const selected =
					subject.turmas.find((t) => t.t === turma) ?? subject.turmas[0];

				set({
					schedules: state.schedules.map((s) =>
						s.id === sched.id
							? { ...s, items: [...s.items, { code, turma: selected.t }] }
							: s,
					),
				});
				return null;
			},

			removeItem: (code) => {
				set((state) => ({
					schedules: state.schedules.map((s) =>
						s.id === state.active
							? { ...s, items: s.items.filter((item) => item.code !== code) }
							: s,
					),
				}));
			},

			setTheme: (theme) => {
				set({ theme });
			},

			toggleTheme: () => {
				set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" }));
			},
		}),
		{
			name: PERSIST_KEY,
			partialize: (state): PersistedState => ({
				done: state.done,
				hidden: state.hidden,
				schedules: state.schedules,
				active: state.active,
				theme: state.theme,
				uid: state.uid,
			}),
			merge: (persisted, current) => {
				const saved = persisted as Partial<PersistedState> | undefined;
				if (!saved) {
					return current;
				}

				const schedules =
					saved.schedules && saved.schedules.length > 0
						? saved.schedules
						: current.schedules;

				let active = saved.active ?? current.active;
				if (!schedules.some((s) => s.id === active)) {
					active = schedules[0].id;
				}

				return {
					...current,
					done: { ...current.done, ...(saved.done ?? {}) },
					hidden: saved.hidden ?? current.hidden,
					schedules,
					active,
					theme: saved.theme ?? current.theme,
					uid: saved.uid ?? current.uid,
				};
			},
		},
	),
);
