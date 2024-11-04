import { create } from "zustand";
import { ThemeStore } from "@/types/zustandTypes";

export const useThemeStore = create<ThemeStore>((set) => ({
    dark_theme_mode: false,
    set_dark_mode: () => {
        const docHTML = document.querySelector('html');
        docHTML?.classList.add('dark');
        localStorage.setItem('theme-dark-mode', JSON.stringify(true));
        set({ dark_theme_mode: true });
    },
    unset_dark_mode: () => {
        const docHTML = document.querySelector('html');
        docHTML?.classList.remove('dark');
        localStorage.setItem('theme-dark-mode', JSON.stringify(false));
        set({ dark_theme_mode: false });
    }
}));

interface GlobalCheckboxStore {
    checkedCount: number;
    incrementCount: (value: number) => void;
    decrementCount: (value: number) => void;
}

export const useGlobalCheckboxStore = create<GlobalCheckboxStore>((set) => ({
    checkedCount: 0,
    incrementCount: (value) => set((state) => ({ checkedCount: state.checkedCount + value })),
    decrementCount: (value) => set((state) => ({ checkedCount: state.checkedCount - value })),
}));