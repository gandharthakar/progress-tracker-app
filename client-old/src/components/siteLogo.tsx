import { useThemeStore } from "@/zustand/store";

const SiteLogo = () => {

    const { theme } = useThemeStore();

    const detectTheme = () => {
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            if (systemTheme == 'dark') {
                return 'dark'
            } else {
                return 'light'
            }
        } else {
            if (theme === 'dark') {
                return 'dark';
            } else {
                return 'light';
            }
        }
    }

    return (
        <>
            {
                detectTheme() == 'dark' ?
                    (
                        <img
                            src="/pt-app-logo-white.svg"
                            alt="Logo"
                            width={100}
                            height={32.98}
                            className="h-auto w-[100px]"
                        />
                    )
                    :
                    (
                        <img
                            src="/pt-app-logo-black.svg"
                            alt="Logo"
                            width={100}
                            height={32.98}
                            className="h-auto w-[100px]"
                        />
                    )
            }
        </>
    )
};

export default SiteLogo;