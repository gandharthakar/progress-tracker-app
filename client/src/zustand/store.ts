import { create } from "zustand";
import { ThemeStore, GlobalCheckboxStore } from "@/types/zustandTypes";

const getTheme = () => {
    const lsitm = localStorage.getItem('theme');
    if (lsitm) {
        const prs_lsitm = JSON.parse(lsitm);
        return prs_lsitm;
    } else {
        localStorage.setItem('theme', JSON.stringify('system'));
        return 'system';
    }
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: getTheme(), // Initial theme, can be adjusted
    toggleTheme: () => {
        set((state) => ({
            theme: state.theme === 'light' ? 'dark' : 'light',
        }));
    },
    setTheme: (theme) => {
        set({ theme });
    },
}));

export const useGlobalCheckboxStore = create<GlobalCheckboxStore>((set) => ({
    checkedCount: 0,
    incrementCount: (value) => set((state) => ({ checkedCount: state.checkedCount + value })),
    decrementCount: (value) => set((state) => ({ checkedCount: state.checkedCount - value })),
}));