import { type ReactNode, useEffect } from "react";
import { usePlannerStore } from "@/shared/stores/planner-store";

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const theme = usePlannerStore((state) => state.theme);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	return children;
}
