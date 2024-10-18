import { useThemeStore } from "@/zustand/store";
import { useEffect } from "react";

const ThemeChecker = () => {

    const set_theme = useThemeStore((state) => state.set_dark_mode);
    const unset_theme = useThemeStore((state) => state.unset_dark_mode);

    useEffect(() => {
        // Manually Toggle and Save Dark Mode.
        const glsi = localStorage.getItem('theme-dark-mode');
        const checkDM = glsi ? JSON.parse(glsi) : '';
        if (checkDM) {
            set_theme();
        } else {
            unset_theme();
        }
        //eslint-disable-next-line
    }, []);

    return (
        <></>
    )
}

export default ThemeChecker;