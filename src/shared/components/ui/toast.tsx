import { useToast } from "@/shared/hooks/use-toast";
import { cn } from "@/shared/utils/cn";

export function Toaster() {
	const message = useToast((state) => state.message);
	const isError = useToast((state) => state.isError);
	const visible = useToast((state) => state.visible);

	return (
		<div
			role="status"
			aria-live="polite"
			className={cn(
				"pointer-events-none fixed bottom-5 left-1/2 z-200 max-w-[90vw] rounded-bp px-4.5 py-2.5 text-center font-medium text-sm shadow-overlay transition-all",
				isError ? "bg-red3 text-white" : "bg-navy-panel text-on-navy",
				visible
					? "translate-x-[-50%] translate-y-0 opacity-100"
					: "translate-x-[-50%] translate-y-5 opacity-0",
			)}
		>
			{message}
		</div>
	);
}
