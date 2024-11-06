import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import ThemeSwitcher from "./themeSwitcher";
import SiteLogo from "./siteLogo";


const Footer = () => {
    return (
        <>
            <div className="border-t-[1px] border-solid border-zinc-300 bg-white dark:bg-zinc-950 dark:border-zinc-800">
                <div className="site-container pt-[20px] pb-[20px] md:pb-[60px]">
                    <div className="flex flex-wrap gap-x-[20px] gap-y-[20px] justify-between flex-col xsm-1:flex-row-reverse">
                        <div className="hidden xsm-1:block">
                            <div>
                                <h4 className="font-poppins text-[14px] text-zinc-800 font-medium block mb-[2px] dark:text-zinc-200">
                                    Change Theme :
                                </h4>
                                <div className="pt-[10px]">
                                    <ThemeSwitcher />
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <h5 className="font-poppins text-[14px] text-zinc-800 font-medium block mb-[2px] dark:text-zinc-200">
                                Follow Us On :
                            </h5>
                            <ul className="flex flex-wrap gap-x-[10px] md:gap-x-[10px] gap-y-[5px] items-center">
                                <li>
                                    <a href="https://www.facebook.com/" title="Follow us on Facebook" className="text-zinc-800 dark:text-zinc-300" target="_blank">
                                        <FaFacebookSquare size={16} className="w-[20px] h-[20px] md:w-[26px] md:h-[26px]" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://x.com/" title="Follow us on X" className="text-zinc-800 dark:text-zinc-300" target="_blank">
                                        <FaSquareXTwitter size={16} className="w-[20px] h-[20px] md:w-[26px] md:h-[26px]" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/" title="Follow us on Instagram" className="text-zinc-800 dark:text-zinc-300" target="_blank">
                                        <FaInstagramSquare size={16} className="w-[20px] h-[20px] md:w-[26px] md:h-[26px]" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://web.whatsapp.com/" title="Chat with us on WhatsApp" className="text-zinc-800 dark:text-zinc-300" target="_blank">
                                        <FaWhatsappSquare size={16} className="w-[20px] h-[20px] md:w-[26px] md:h-[26px]" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="pb-[20px]">
                                <SiteLogo />
                            </div>
                            <div className="block xsm-1:hidden pb-[20px]">
                                <div>
                                    <h4 className="font-poppins text-[14px] text-zinc-800 font-medium block dark:text-zinc-200">
                                        Change Theme :
                                    </h4>
                                    <div className="pt-[5px]">
                                        <ThemeSwitcher />
                                    </div>
                                </div>
                            </div>
                            <div className="block md:hidden pb-[20px]">
                                <h5 className="font-poppins text-[14px] text-zinc-800 font-medium block mb-[2px] dark:text-zinc-200">
                                    Follow Us On :
                                </h5>
                                <ul className="flex flex-wrap gap-x-[10px] md:gap-x-[10px] gap-y-[5px] items-center">
                                    <li>
                                        <a href="https://www.facebook.com/" title="Follow us on Facebook" className="text-zinc-800 dark:text-zinc-300" target="_blank">
                                            <FaFacebookSquare size={16} className="w-[20px] h-[20px] md:w-[26px] md:h-[26px]" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://x.com/" title="Follow us on X" className="text-zinc-800 dark:text-zinc-300" target="_blank">
                                            <FaSquareXTwitter size={16} className="w-[20px] h-[20px] md:w-[26px] md:h-[26px]" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/" title="Follow us on Instagram" className="text-zinc-800 dark:text-zinc-300" target="_blank">
                                            <FaInstagramSquare size={16} className="w-[20px] h-[20px] md:w-[26px] md:h-[26px]" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://web.whatsapp.com/" title="Chat with us on WhatsApp" className="text-zinc-800 dark:text-zinc-300" target="_blank">
                                            <FaWhatsappSquare size={16} className="w-[20px] h-[20px] md:w-[26px] md:h-[26px]" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h6 className="font-poppins text-[12px] text-zinc-500 dark:text-zinc-400">
                                    &copy; {new Date().getFullYear()} All Rights Reserved.
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;