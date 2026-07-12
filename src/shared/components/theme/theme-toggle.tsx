import { Moon, Sun } from "lucide-react";
import { usePlannerStore } from "@/shared/stores/planner-store";

export function ThemeToggle() {
	const theme = usePlannerStore((state) => state.theme);
	const toggleTheme = usePlannerStore((state) => state.toggleTheme);
	const isLight = theme === "light";

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label="Alternar tema"
			className="flex items-center gap-1.5 rounded-bp bg-navy-input px-3.5 py-2 font-medium text-on-navy text-xs shadow-navy-btn transition-colors hover:bg-navy-input-h"
		>
			{isLight ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
			<span>{isLight ? "Modo escuro" : "Modo claro"}</span>
		</button>
	);
}
