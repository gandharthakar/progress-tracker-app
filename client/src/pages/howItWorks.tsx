import { IoPlayCircleSharp } from "react-icons/io5";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const HowItWorks = () => {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-950 pt-[100px] pb-[50px] mdl-1:pt-[150px]">
                <div className="site-container w-full">
                    <div className="pb-[15px] md:pb-[20px] text-center">
                        <h1 className="inline-block font-poppins font-bold text-[20px] md:text-[26px] text-zinc-800 dark:text-zinc-200">
                            How It Works
                        </h1>
                        <div className="max-w-[300px] mx-auto">
                            <p className="font-roboto_mono text-[14px] md:text-[16px] text-zinc-600 dark:text-zinc-400">
                                Below is a stemps to follow to use this tool.
                            </p>
                        </div>
                    </div>
                    <div className="pb-[20px] md:pb-[30px] text-center">
                        <div className="inline-block">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button
                                        type="button"
                                        title="Watch Demo"
                                        className="flex justify-center items-center gap-x-[5px] text-zinc-900 dark:text-zinc-200"
                                    >
                                        <h4 className="font-poppins font-semibold text-[14px] md:text-[16px]">
                                            Watch Demo
                                        </h4>
                                        <IoPlayCircleSharp size={45} className="w-[40px] h-[40px] md:w-[45px] md:h-[45px]" />
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader className="text-zinc-900 dark:text-zinc-200">
                                        <DialogTitle>Watch Demo Video.</DialogTitle>
                                        <DialogDescription>
                                            Watch demo video to se howthis tool works in real world.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="pb-[55%] relative">
                                        <iframe
                                            width="560px"
                                            height="315px"
                                            className="absolute left-0 top-0 w-full h-full"
                                            src="https://www.youtube.com/embed/e5KiAI2KT9U?si=B4eLgRQxffY719_Q"
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen></iframe>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mdl-1:grid-cols-2">
                        <div className="flex md:min-h-[350px] flex-col gap-y-[8px] p-[20px] md:p-[30px] border-t-[2px] border-b-[2px] border-l-[2px] border-r-[2px] mdl-1:border-r-0 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 digonal-lines-bg">
                            <div>
                                <h2 className="flex items-center justify-center w-[27px] h-[27px] md:w-[40px] md:h-[40px] rounded-full font-poppins font-semibold text-[14px] md:text-[20px] text-zinc-200 dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-50">
                                    1
                                </h2>
                            </div>
                            <div className="mt-auto">
                                <h3 className="font-poppins font-semibold text-[16px] md:text-[26px] text-zinc-900 dark:text-zinc-200">
                                    User Register & Login
                                </h3>
                                <p className="font-roboto_mono text-[12px] md:text-[14px] text-zinc-600 dark:text-zinc-400">
                                    You must first register & login first as a user to use the tool.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap flex-col md:flex-row border-t-0 mdl-1:border-t-[2px] border-zinc-300 dark:border-zinc-700">
                            <div className="flex md:min-h-[300px] md:w-1/2 flex-col gap-y-[8px] p-[20px] border-l-[2px] border-b-[2px] border-r-[2px] md:border-r-0 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700">
                                <div>
                                    <h2 className="flex items-center justify-center w-[27px] h-[27px] md:w-[30px] md:h-[30px] rounded-full font-poppins font-semibold text-[14px] md:text-[16px] text-zinc-200 dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-50">
                                        2
                                    </h2>
                                </div>
                                <div className="mt-auto">
                                    <h3 className="font-poppins font-semibold text-[16px] md:text-[18px] text-zinc-900 dark:text-zinc-200">
                                        Create Workspace
                                    </h3>
                                    <p className="font-roboto_mono text-[12px] md:text-[14px] text-zinc-600 dark:text-zinc-400">
                                        After login, you need to create a workspace (project) for multiple goals.
                                    </p>
                                </div>
                            </div>
                            <div className="flex md:min-h-[300px] md:w-1/2 flex-col gap-y-[8px] p-[20px] border-l-[2px] border-b-[2px] border-r-[2px] bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700">
                                <div>
                                    <h2 className="flex items-center justify-center w-[27px] h-[27px] md:w-[30px] md:h-[30px] rounded-full font-poppins font-semibold text-[14px] md:text-[16px] text-zinc-200 dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-50">
                                        3
                                    </h2>
                                </div>
                                <div className="mt-auto">
                                    <h3 className="font-poppins font-semibold text-[16px] md:text-[18px] text-zinc-900 dark:text-zinc-200">
                                        Create Sections
                                    </h3>
                                    <p className="font-roboto_mono text-[12px] md:text-[14px] text-zinc-600 dark:text-zinc-400">
                                        Create sections to separate & manage tasks in proper manner.
                                    </p>
                                </div>
                            </div>
                            <div className="flex md:min-h-[300px] md:w-1/2 flex-col gap-y-[8px] p-[20px] border-l-[2px] border-b-[2px] border-r-[2px] md:border-r-0 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700">
                                <div>
                                    <h2 className="flex items-center justify-center w-[27px] h-[27px] md:w-[30px] md:h-[30px] rounded-full font-poppins font-semibold text-[14px] md:text-[16px] text-zinc-200 dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-50">
                                        4
                                    </h2>
                                </div>
                                <div className="mt-auto">
                                    <h3 className="font-poppins font-semibold text-[16px] md:text-[18px] text-zinc-900 dark:text-zinc-200">
                                        Create Tasks
                                    </h3>
                                    <p className="font-roboto_mono text-[12px] md:text-[14px] text-zinc-600 dark:text-zinc-400">
                                        Create you task which you want to track in real world.
                                    </p>
                                </div>
                            </div>
                            <div className="flex md:min-h-[300px] md:w-1/2 flex-col gap-y-[8px] p-[20px] border-l-[2px] border-b-[2px] border-r-[2px] bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700">
                                <div>
                                    <h2 className="flex items-center justify-center w-[27px] h-[27px] md:w-[30px] md:h-[30px] rounded-full font-poppins font-semibold text-[14px] md:text-[16px] text-zinc-200 dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-50">
                                        5
                                    </h2>
                                </div>
                                <div className="mt-auto">
                                    <h3 className="font-poppins font-semibold text-[16px] md:text-[18px] text-zinc-900 dark:text-zinc-200">
                                        Create Labels
                                    </h3>
                                    <p className="font-roboto_mono text-[12px] md:text-[14px] text-zinc-600 dark:text-zinc-400">
                                        Create appropriate labels for you tasks to determine progress.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default HowItWorks;