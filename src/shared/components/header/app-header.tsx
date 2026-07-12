import { SUBJECTS } from "@/features/subjects/data/subjects";
import { ThemeToggle } from "@/shared/components/theme/theme-toggle";
import { Stat } from "@/shared/components/ui/stat";
import { usePlannerStore } from "@/shared/stores/planner-store";

export function AppHeader() {
	const done = usePlannerStore((state) => state.done);
	const schedulesCount = usePlannerStore((state) => state.schedules.length);

	const pending = SUBJECTS.filter((subject) => !done[subject.code]).length;
	const paid = SUBJECTS.filter((subject) => done[subject.code]).length;

	return (
		<header className="sticky top-0 z-30 flex flex-wrap items-center gap-5 border-navy-dark border-b bg-navy px-5.5 py-3 text-on-navy shadow-hairline">
			<div>
				<h1 className="cond font-bold text-xl uppercase leading-tight tracking-[0.14em]">
					Planejador <em className="text-blue5 not-italic">2026.2</em>
				</h1>
				<p className="mt-px text-on-navy-muted text-xs">
					Ciência da Computação · UFPI · oferta oficial do período
				</p>
			</div>
			<div className="ml-auto flex flex-wrap items-center gap-2">
				<Stat value={pending} label="Pendentes" tone="warn" />
				<Stat value={paid} label="Já pagas" tone="good" />
				<Stat value={schedulesCount} label="Cronogramas" />
				<ThemeToggle />
			</div>
		</header>
	);
}
