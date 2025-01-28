import { NavLink } from "react-router-dom";
import AccountProfileHome from "@/components/accountProfileHome";
import { useEffect, useRef, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import SiteLogo from "@/components/siteLogo";

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleSiteMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    }

    useEffect(() => {

        const menuHandler = (e: MouseEvent) => {
            if (menuRef.current !== null) {
                if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                    setIsMenuOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', menuHandler);
        return () => {
            document.removeEventListener('mousedown', menuHandler);
        };
    }, []);

    return (
        <>
            <header className="absolute w-full z-[20] left-0 top-0 bg-white dark:bg-zinc-950 md:bg-transparent">
                <div className="site-container">
                    <div className="flex items-center gap-x-[15px] py-[15px]">
                        <div>
                            <NavLink to="/" title="Home">
                                <SiteLogo />
                            </NavLink>
                        </div>
                        <nav ref={menuRef} className={`${isMenuOpen ? 'block' : 'hidden md:block'} mx-0 md:mx-auto p-[20px] md:p-0 absolute left-0 top-[70px] w-full bg-white dark:bg-zinc-900 md:bg-transparent md:dark:bg-transparent md:top-0 md:w-auto md:relative`}>
                            <ul className="site-main-menu">
                                <li>
                                    <NavLink
                                        to="/how-it-works"
                                        title="How it Works"
                                        className="nav-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        How It Works
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/about"
                                        title="About"
                                        className="nav-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/contact"
                                        title="Contact"
                                        className="nav-link"
                                        onClick={() => setIsMenuOpen(false)}
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
                        <div>
                            <AccountProfileHome cb={() => setIsMenuOpen(false)} />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;