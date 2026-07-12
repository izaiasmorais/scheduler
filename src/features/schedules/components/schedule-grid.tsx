import { Fragment, useMemo } from "react";
import { ScheduleBlock } from "@/features/schedules/components/schedule-block";
import { DAYS, HOURS, TURNO_LABEL } from "@/features/schedules/constants/grid";
import { buildOccupancy } from "@/features/schedules/utils/occupancy";
import { getSubject } from "@/features/subjects/data/subjects";
import { toast } from "@/shared/hooks/use-toast";
import { DAY_NAMES, pad } from "@/shared/lib/horario";
import { usePlannerStore } from "@/shared/stores/planner-store";
import { cn } from "@/shared/utils/cn";

export function ScheduleGrid() {
	const schedules = usePlannerStore((state) => state.schedules);
	const active = usePlannerStore((state) => state.active);
	const removeItem = usePlannerStore((state) => state.removeItem);

	const sched = schedules.find((s) => s.id === active) ?? schedules[0];
	const occupancy = useMemo(() => buildOccupancy(sched), [sched]);

	function handleRemove(code: string) {
		const subject = getSubject(code);
		removeItem(code);
		if (subject) {
			toast(`${subject.name} removida de "${sched.name}"`);
		}
	}

	const headCell =
		"cond sticky top-0 z-[5] border-line border-r border-b bg-thead px-2 py-2.25 font-bold text-muted text-xs uppercase tracking-widest";

	return (
		<div className="overflow-auto rounded-bp bg-panel shadow-card">
			<table className="w-full min-w-180 table-fixed border-separate border-spacing-0">
				<colgroup>
					<col className="w-28" />
					<col />
					<col />
					<col />
					<col />
					<col />
				</colgroup>
				<thead>
					<tr>
						<th className={cn(headCell, "text-left text-text")}>
							{sched.name}
						</th>
						{DAYS.map((day) => (
							<th key={day} className={cn(headCell, "last:border-r-0")}>
								{DAY_NAMES[day]}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{HOURS.map((hour) => (
						<Fragment key={hour}>
							{TURNO_LABEL[hour] ? (
								<tr>
									<td
										colSpan={6}
										className="cond border-line border-b bg-turno px-3 py-0.75 font-bold text-2xs text-faint uppercase tracking-[0.24em]"
									>
										{TURNO_LABEL[hour]}
									</td>
								</tr>
							) : null}
							<tr>
								<td className="border-line border-r border-b bg-thead px-2.5 text-right align-middle text-muted text-xs tabular-nums whitespace-nowrap">
									<b className="font-bold text-text">{pad(hour)}</b> –{" "}
									{pad(hour + 1)}
								</td>
								{DAYS.map((day, index) => {
									const occupant = occupancy[`${day}-${hour}`];
									const isLast = index === DAYS.length - 1;

									if (!occupant) {
										return (
											<td
												key={day}
												className={cn(
													"h-11.5 border-line border-r border-b p-0.75 align-top",
													isLast && "border-r-0",
												)}
											/>
										);
									}

									const single = occupant.end - occupant.start === 1;
									const isStart = occupant.start === hour;
									const isEnd = occupant.end === hour + 1;
									const joined = !single && !isEnd;

									return (
										<td
											key={day}
											className={cn(
												"h-11.5 overflow-hidden border-line border-r border-b p-0.75 align-top",
												isLast && "border-r-0",
												joined && "border-b-0",
												!single && isStart && "pb-0",
												!single && !isStart && !isEnd && "py-0",
												!single && isEnd && "pt-0",
											)}
										>
											<ScheduleBlock
												occupant={occupant}
												hour={hour}
												onRemove={handleRemove}
											/>
										</td>
									);
								})}
							</tr>
						</Fragment>
					))}
				</tbody>
			</table>
		</div>
	);
}
