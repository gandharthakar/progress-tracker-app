import { useThemeStore } from "@/zustand/store";
import { useEffect } from "react";

const ThemeCheckerBKP = () => {

    const { theme, setTheme } = useThemeStore();

    const handleChange = ({ matches }: any) => {
        const docHTML = document.querySelector('html');
        if (matches) {
            // setTheme('dark');
            docHTML?.classList.add('dark');
        } else {
            // setTheme('light');
            docHTML?.classList.remove('dark');
        }
    }

    // Check system preference and set theme accordingly
    useEffect(() => {
        const docHTML = document.querySelector('html');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const lsitm = localStorage.getItem('theme');
        if (lsitm) {
            const prs_lsitm = JSON.parse(lsitm);

            if (prs_lsitm === 'system') {
                if (systemTheme == 'dark') {
                    // setTheme('dark');
                    docHTML?.classList.add('dark');
                } else {
                    // setTheme('light');
                    docHTML?.classList.remove('dark');
                }

                window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", handleChange);
            }
        } else {
            if (systemTheme === 'dark') {
                // setTheme('dark');
                docHTML?.classList.add('dark');
            } else {
                // setTheme('light');
                docHTML?.classList.remove('dark');
            }

            localStorage.setItem('theme', JSON.stringify('system'));
            setTheme('system');
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", handleChange);
        }

        return () => {
            window.removeEventListener("change", handleChange);
        };
        //eslint-disable-next-line
    }, []);

    useEffect(() => {

        const docHTML = document.querySelector('html');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const lsitm = localStorage.getItem('theme');
        if (lsitm) {
            const prs_lsitm = JSON.parse(lsitm);
            if (prs_lsitm !== 'system') {
                if (prs_lsitm === 'light') {
                    setTheme('light');
                    docHTML?.classList.remove('dark');
                } else {
                    setTheme('dark');
                    docHTML?.classList.add('dark');
                }
            } else {
                if (systemTheme === 'dark') {
                    // setTheme('dark');
                    docHTML?.classList.add('dark');
                } else {
                    // setTheme('light');
                    docHTML?.classList.remove('dark');
                }
                setTheme('system');
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", handleChange);
            }
        }

        return () => {
            window.removeEventListener("change", handleChange);
        };

        //eslint-disable-next-line
    }, [theme, setTheme]);

    return (
        <>

        </>
    )
};

export default ThemeCheckerBKP;