import { X } from "lucide-react";
import { toast } from "@/shared/hooks/use-toast";
import { usePlannerStore } from "@/shared/stores/planner-store";
import { cn } from "@/shared/utils/cn";

export function ScheduleTabs() {
	const schedules = usePlannerStore((state) => state.schedules);
	const active = usePlannerStore((state) => state.active);
	const setActive = usePlannerStore((state) => state.setActive);
	const addSchedule = usePlannerStore((state) => state.addSchedule);
	const removeSchedule = usePlannerStore((state) => state.removeSchedule);
	const renameSchedule = usePlannerStore((state) => state.renameSchedule);

	function handleAdd() {
		const schedule = addSchedule();
		toast(`"${schedule.name}" criado`);
	}

	function handleDelete(id: string, name: string) {
		if (window.confirm(`Excluir "${name}"?`)) {
			removeSchedule(id);
		}
	}

	function handleRename(id: string, currentName: string) {
		const name = window.prompt("Nome do cronograma:", currentName)?.trim();
		if (name) {
			renameSchedule(id, name);
		}
	}

	return (
		<div className="mb-2.5 flex flex-wrap items-center gap-1.5">
			{schedules.map((schedule) => {
				const isActive = schedule.id === active;
				return (
					<div
						key={schedule.id}
						className={cn(
							"cond flex items-center gap-2 rounded-bp py-1.75 pr-1.5 pl-3.5 font-bold text-xs uppercase tracking-widest shadow-card",
							isActive
								? "bg-blue3 text-white shadow-intent"
								: "bg-panel text-muted hover:text-text dark:bg-panel2",
						)}
					>
						<button
							type="button"
							className="flex cursor-pointer items-center gap-2 bg-transparent"
							onClick={() => setActive(schedule.id)}
							onDoubleClick={() => handleRename(schedule.id, schedule.name)}
						>
							{schedule.name}
							<span
								className={cn(
									"flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 font-bold text-2xs tabular-nums",
									isActive
										? "bg-white/20 text-white"
										: "bg-black/10 text-muted dark:bg-white/10",
								)}
							>
								{schedule.items.length}
							</span>
						</button>
						{schedules.length > 1 ? (
							<button
								type="button"
								aria-label="Excluir cronograma"
								title="Excluir"
								onClick={() => handleDelete(schedule.id, schedule.name)}
								className="flex cursor-pointer items-center justify-center rounded-bp p-1 opacity-70 hover:bg-black/25 hover:opacity-100"
							>
								<X className="size-3" />
							</button>
						) : null}
					</div>
				);
			})}

			<button
				type="button"
				onClick={handleAdd}
				className="cond cursor-pointer rounded-bp border border-line2 border-dashed px-3.5 py-1.75 font-bold text-muted text-xs uppercase tracking-wide transition-colors hover:border-blue3 hover:text-blue3"
			>
				+ Novo cronograma
			</button>
		</div>
	);
}
