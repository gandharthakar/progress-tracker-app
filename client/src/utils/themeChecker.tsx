import { useThemeStore } from "@/zustand/store";
import { useEffect } from "react";

const ThemeChecker = () => {

    const { theme, setTheme } = useThemeStore();

    // const handleChange = ({ matches }: any) => {
    //     const docHTML = document.querySelector('html');
    //     console.log(matches);
    //     if (matches) {
    //         docHTML?.classList.add('dark');
    //     } else {
    //         docHTML?.classList.remove('dark');
    //     }
    // }

    const detectDarkTheme = () => {
        const docHTML = document.querySelector('html');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        if (systemTheme == 'dark') {
            docHTML?.classList.add('dark');
        } else {
            docHTML?.classList.remove('dark');
        }
    }

    useEffect(() => {
        const lsitm = localStorage.getItem('theme');
        if (lsitm) {
            const prs_lsitm = JSON.parse(lsitm);
            if (prs_lsitm === 'system') {
                setTheme('system');
                detectDarkTheme();
                // window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", handleChange);
            }
        }
        // return () => {
        //     window.removeEventListener("change", handleChange);
        // };
    }, []);

    useEffect(() => {
        const docHTML = document.querySelector('html');
        const lsitm = localStorage.getItem('theme');

        if (lsitm) {
            const prs_lsitm = JSON.parse(lsitm);
            if (prs_lsitm === 'system') {
                detectDarkTheme();
            } else {
                if (prs_lsitm === 'light') {
                    setTheme('light');
                    docHTML?.classList.remove('dark');
                } else {
                    setTheme('dark');
                    docHTML?.classList.add('dark');
                }
            }
        }

    }, [theme, setTheme]);

    return (
        <>

        </>
    )
};

export default ThemeChecker;