import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiMonitor } from "react-icons/fi";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { useThemeStore } from "@/zustand/store";
import { useEffect } from "react";
import { ThemeStore } from "@/types/zustandTypes";

const ThemeSwitcher = () => {

    const { theme, setTheme } = useThemeStore();

    const handleThemeChange = (selectedTheme: ThemeStore['theme']) => {
        setTheme(selectedTheme);
        // Store the selected theme in local storage
        localStorage.setItem('theme', JSON.stringify(selectedTheme));
    };

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
            <Tabs defaultValue={theme} className="w-[150px]">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="light" onClick={() => handleThemeChange('light')}>
                        <MdOutlineLightMode size={18} />
                    </TabsTrigger>
                    <TabsTrigger value="system" onClick={() => handleThemeChange('system')}>
                        <FiMonitor size={18} />
                    </TabsTrigger>
                    <TabsTrigger value="dark" onClick={() => handleThemeChange('dark')}>
                        <CiDark size={18} />
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </>
    )
};

export default ThemeSwitcher;