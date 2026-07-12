import { create } from "zustand";

interface ToastState {
	message: string;
	isError: boolean;
	visible: boolean;
	show: (message: string, isError?: boolean) => void;
	hide: () => void;
}

let hideTimeout: ReturnType<typeof setTimeout> | undefined;

export const useToast = create<ToastState>((set) => ({
	message: "",
	isError: false,
	visible: false,
	show: (message, isError = false) => {
		set({ message, isError, visible: true });
		if (hideTimeout) {
			clearTimeout(hideTimeout);
		}
		hideTimeout = setTimeout(
			() => set({ visible: false }),
			isError ? 4000 : 2600,
		);
	},
	hide: () => set({ visible: false }),
}));

export function toast(message: string, isError = false) {
	useToast.getState().show(message, isError);
}
