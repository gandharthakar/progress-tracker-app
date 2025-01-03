export type ThemeStore = {
    theme: 'light' | 'dark' | 'system' | string;
    toggleTheme: () => void,
    setTheme: (theme: ThemeStore['theme']) => void,
}

export interface GlobalCheckboxStore {
    checkedCount: number;
    incrementCount: (value: number) => void;
    decrementCount: (value: number) => void;
}