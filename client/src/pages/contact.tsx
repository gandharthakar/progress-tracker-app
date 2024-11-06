import { IoLocationOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";

const Contact = () => {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-950 pt-[100px] pb-[50px] md:pt-[100px] mdl-1:pt-[150px]">
                <div className="w-full">
                    <div className="site-container">
                        <div className="grid grid-cols-1 mdl-1:grid-cols-2 gap-x-[50px] gap-y-[30px]">
                            <div>
                                <div className="pb-[5px] md:pb-[8px]">
                                    <h1 className="font-poppins font-bold text-[28px] md:text-[45px] text-zinc-900 dark:text-zinc-100">
                                        Get In Touch
                                    </h1>
                                </div>
                                <div>
                                    <h2 className="font-roboto_mono text-[14px] md:text-[18px] text-zinc-600 dark:text-zinc-400">
                                        We'd love to hear from you! Whether you have questions, need support, or want to learn more about our services, our team is here to help.
                                    </h2>
                                </div>
                            </div>
                            <div>
                                <div className="grid grid-cols-1 xsm-1:grid-cols-2 gap-x-[30px] gap-y-[30px]">
                                    <div>
                                        <div className="pb-[8px] md:pb-[15px]">
                                            <div className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] flex items-center justify-center rounded-md md:rounded-xl bg-zinc-800 text-zinc-100">
                                                <IoLocationOutline size={28} className="w-[16px] h-[16px] md:w-[28px] md:h-[28px]" />
                                            </div>
                                        </div>
                                        <div className="pb-[3px] md:pb-[5px]">
                                            <h2 className="font-poppins text-[14px] md:text-[18px] text-zinc-800 dark:text-zinc-200 font-bold">
                                                Our Address
                                            </h2>
                                        </div>
                                        <div>
                                            <p className="font-roboto_mono text-[14px] md:text-[18px] text-zinc-600 dark:text-zinc-400">
                                                Asklepios Tower, <br /> Makima Street 251
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pb-[8px] md:pb-[15px]">
                                            <div className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] flex items-center justify-center rounded-md md:rounded-xl bg-zinc-800 text-zinc-100">
                                                <BsTelephone size={24} className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]" />
                                            </div>
                                        </div>
                                        <div className="pb-[3px] md:pb-[5px]">
                                            <h2 className="font-poppins text-[14px] md:text-[18px] text-zinc-800 dark:text-zinc-200 font-bold">
                                                Our Contact Info
                                            </h2>
                                        </div>
                                        <div>
                                            <p className="font-roboto_mono text-[14px] md:text-[18px] text-zinc-600 dark:text-zinc-400 break-words">
                                                +123 456 789 <br /> contact@ptapp.com <br /> support@ptapp.com
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-[50px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14796703.56427648!2d-2.8741225279740243!3d63.08218985191414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x461268458f4de5bf%3A0xa1b03b9db864d02b!2sNorway!5e0!3m2!1sen!2sin!4v1730887064099!5m2!1sen!2sin"
                            width="600px"
                            height="450px"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="m-0 border-0 h-[250px] md:h-[500px] w-full p-0"
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Contact;