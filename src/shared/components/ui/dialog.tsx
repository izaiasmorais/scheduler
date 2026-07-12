import { type ReactNode, useEffect } from "react";

interface DialogProps {
	open: boolean;
	onClose: () => void;
	title: string;
	subtitle?: string;
	children: ReactNode;
	footer?: ReactNode;
}

export function Dialog({
	open,
	onClose,
	title,
	subtitle,
	children,
	footer,
}: DialogProps) {
	useEffect(() => {
		if (!open) {
			return;
		}
		function handleKeydown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				onClose();
			}
		}
		document.addEventListener("keydown", handleKeydown);
		return () => document.removeEventListener("keydown", handleKeydown);
	}, [open, onClose]);

	if (!open) {
		return null;
	}

	return (
		<button
			type="button"
			aria-label="Fechar"
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}
			className="fixed inset-0 z-100 flex cursor-default items-center justify-center bg-black/70 p-4.5"
		>
			<div
				role="dialog"
				aria-modal="true"
				className="max-h-[86vh] w-full max-w-110 cursor-auto overflow-y-auto rounded-bp bg-panel text-left shadow-overlay"
			>
				<div className="px-5 pt-3.5 pb-3 shadow-hairline">
					<h2 className="cond font-bold text-base text-text uppercase tracking-widest">
						{title}
					</h2>
					{subtitle ? (
						<p className="mt-0.5 text-muted text-xs">{subtitle}</p>
					) : null}
				</div>
				<div className="px-5 pt-3 pb-4.5">
					{children}
					{footer}
				</div>
			</div>
		</button>
	);
}
