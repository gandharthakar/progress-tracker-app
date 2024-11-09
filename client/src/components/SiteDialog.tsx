import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { SiteDialogProps } from "@/types/componentsTypes";

const SiteDialog = (props: SiteDialogProps) => {
    const {
        open_modal_on_page_load = false,
        openState,
        setOpenState,
        modal_heading,
        backdrop = true,
        hide_modal_on_backdrop_click,
        modal_max_width = 600,
        children,
        roundedModal,
        roundness = 10,
        closeOnEscKey = true
    } = props;

    const handleBackDropClick = () => {
        if (hide_modal_on_backdrop_click) {
            setOpenState(false);
        }
    }
    const calcmaxw = `calc(100% - 40px)`;

    useEffect(() => {
        if (open_modal_on_page_load) {
            setOpenState(true);
        }
        //eslint-disable-next-line
    }, [open_modal_on_page_load]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpenState(false);
            }
        };

        if (closeOnEscKey) {
            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, []);

    const applyRoundness = () => {
        if (roundedModal && roundedModal === true) {
            if (roundness) {
                return {
                    borderRadius: roundness
                }
            }
        }
    }

    return (
        <>
            {
                openState ? (
                    <>
                        {
                            backdrop ? (
                                <>
                                    <div className="fixed top-0 left-0 w-full h-full z-[30] bg-black/50 backdrop-blur-[3px]" onClick={handleBackDropClick}></div>
                                </>
                            )
                                :
                                ('')
                        }
                        <div className={`fixed top-1/2 left-1/2 translate-x-[calc(-50%-20px)] translate-y-[calc(-50%-20px)] w-full my-[20px] mx-[20px] z-[32] max-h-[calc(100%-40px)] overflow-y-auto`} style={{ width: calcmaxw, maxWidth: modal_max_width + 'px' }}>
                            <div className={`bg-white w-full mx-auto dark:bg-zinc-900 border border-zinc-200 border-solid dark:border-zinc-700`} style={{ maxWidth: modal_max_width + 'px', ...applyRoundness() }}>
                                {modal_heading && (
                                    <header className="flex items-center gap-x-4 justify-between p-[10px] md:p-[15px] border-b border-zinc-300 border-solid dark:border-zinc-500">
                                        <h1 className="font-poppins text-[16px] md:text-[20px] font-semibold text-theme-color-1 dark:text-zinc-200">
                                            {modal_heading}
                                        </h1>
                                        <div>
                                            <IoCloseSharp title="Close" size={20} className="cursor-pointer w-[25px] h-[25px] md:w-[30px] md:h-[30px] text-zinc-700 dark:text-zinc-200" onClick={handleBackDropClick} />
                                        </div>
                                    </header>
                                )}
                                <div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </>
                ) : ('')
            }
        </>
    )
};

export default SiteDialog;