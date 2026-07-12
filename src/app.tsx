import { ScheduleGrid, ScheduleTabs } from "@/features/schedules";
import { SubjectsPanel } from "@/features/subjects";
import { AppHeader } from "@/shared/components/header/app-header";
import { ThemeProvider } from "@/shared/components/theme/theme-provider";
import { Toaster } from "@/shared/components/ui/toast";

export function App() {
	return (
		<ThemeProvider>
			<div className="flex h-screen flex-col">
				<AppHeader />
				<div className="flex min-h-0 flex-1 max-lg:flex-col">
					<SubjectsPanel />
					<main className="min-w-0 flex-1 overflow-y-auto px-5.5 pt-4 pb-15">
						<ScheduleTabs />
						<p className="mb-3 text-faint text-xs">
							"Adicionar" insere direto no cronograma da aba ativa · dois
							cliques na aba renomeiam · passe o mouse num bloco para removê-lo.
						</p>
						<ScheduleGrid />
					</main>
				</div>
			</div>
			<Toaster />
		</ThemeProvider>
	);
}
