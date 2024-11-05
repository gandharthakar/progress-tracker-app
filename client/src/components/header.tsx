import { NavLink } from "react-router-dom";
import { useThemeStore } from "@/zustand/store";
import AccountProfile from "./accountProfile";
import { useEffect, useRef, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";

const Header = () => {

    const { theme } = useThemeStore();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

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

    const toggleSiteMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    }

    useEffect(() => {

        const menuHandler = (e: any) => {
            if (menuRef.current !== null) {
                if (!menuRef.current.contains(e.target)) {
                    setIsMenuOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', menuHandler);

    }, []);

    return (
        <>
            <header className="absolute w-full z-[20] left-0 top-0 bg-white dark:bg-zinc-950 md:bg-transparent">
                <div className="site-container">
                    <div className="flex items-center gap-x-[15px] py-[15px]">
                        <div>
                            <NavLink to="/" title="Home">
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
                            </NavLink>
                        </div>
                        <nav ref={menuRef} className={`${isMenuOpen ? 'block' : 'hidden md:block'} mx-0 md:mx-auto p-[20px] md:p-0 absolute left-0 top-[70px] w-full bg-white dark:bg-zinc-900 md:bg-transparent md:dark:bg-transparent md:top-0 md:w-auto md:relative`}>
                            <ul className="site-main-menu">
                                <li>
                                    <NavLink
                                        to="/how-it-works"
                                        title="How it Works"
                                        className="nav-link"
                                    >
                                        How It Works
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/about"
                                        title="About"
                                        className="nav-link"
                                    >
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/contact"
                                        title="Contact"
                                        className="nav-link"
                                    >
                                        Contact
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <div className="ml-auto md:ml-0 visible md:hidden h-[40px]">
                            <button
                                type="button"
                                title="Toggle Menu"
                                className="border border-zinc-200 rounded-[0.5rem] bg-white hover:bg-zinc-100 w-[40px] h-[40px] relative dark:text-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                                onClick={toggleSiteMenu}
                            >
                                {
                                    isMenuOpen ?
                                        (<MdOutlineClose size={20} className="!w-[26px] !h-[26px] absolute left-[6px] top-[6px] z-[5]" />)
                                        :
                                        (<IoMenuOutline size={20} className="!w-[26px] !h-[26px] absolute left-[6px] top-[6px] z-[5]" />)
                                }
                            </button>
                        </div>
                        <div className="">
                            <AccountProfile />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;