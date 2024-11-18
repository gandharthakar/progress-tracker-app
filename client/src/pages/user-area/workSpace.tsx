import SiteDialog from "@/components/SiteDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import demo_workspaces from "@/utils/demoData";
import { SiteWorkspaceCompProps } from "@/types/componentsTypes";
import WorkspaceBox from "@/components/workspaceBox";

const WorkSpace = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [data, setData] = useState<SiteWorkspaceCompProps[]>([]);

    const validationSchema = z.object({
        workspaceName: z.string({
            required_error: "Please enter Workspace Name",
            invalid_type_error: "Workspace Name must be in string format."
        }).min(6, { message: "Workspace name must be contains at least 6 characters." }),
    });

    type validationSchema = z.infer<typeof validationSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema)
    });

    const handleFormSubmit: SubmitHandler<validationSchema> = (formdata) => {
        console.log(formdata);
    }

    useEffect(() => {
        setData(demo_workspaces);
        // setData([]);
    }, []);

    return (
        <>
            <div className="py-[50px] md:py-[100px] px-[20px] text-center bg-zinc-50 dark:bg-zinc-900">
                <h1 className="text-[20px] md:text-[35px] font-poppins font-bold text-zinc-900 dark:text-zinc-200 break-words">
                    Welcome, Amit Kumar
                </h1>
                <div className="pt-[5px]">
                    <p className="font-roboto_mono text-[14px] md:text-[16px] text-zinc-700 dark:text-zinc-300">
                        Create & locate all your workspaces here.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-950 min-h-[100vh] pb-[50px] digonal-lines-bg">
                <div className="site-container">
                    <div className="py-[30px]">
                        <div className="flex flex-wrap items-center justify-between gap-x-[20px] gap-y-[15px] p-[20px] md:p-[30px] rounded-[7px] md:rounded-[10px] bg-white dark:bg-zinc-900 border border-solid border-zinc-200 dark:border-zinc-700">
                            <div>
                                <h2 className="block font-poppins font-semibold text-[18px] md:text-[20px] text-zinc-900 dark:text-zinc-200">
                                    Create Workspace
                                </h2>
                                <p className="block font-roboto_mono text-[12px] md:text-[14px] text-zinc-900 dark:text-zinc-400">
                                    Create new workspaces for different goals.
                                </p>
                            </div>
                            <div>
                                <div className="hidden md:block">
                                    <Button
                                        title="+ Add New"
                                        onClick={() => setShowModal(true)}
                                    >
                                        <Plus />
                                        Add New
                                    </Button>
                                </div>
                                <div className="block md:hidden">
                                    <Button
                                        size="sm"
                                        title="+ Add New"
                                        onClick={() => setShowModal(true)}
                                    >
                                        <Plus />
                                        Add New
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mdl-1:grid-cols-3 gap-x-[20px] gap-y-[20px]">
                        {
                            data.length ?
                                (
                                    <>
                                        {
                                            data.map((item) => (
                                                <WorkspaceBox
                                                    key={item.workspace_id}
                                                    workspace_id={item.workspace_id}
                                                    workspace_title={item.workspace_title}
                                                    workspace_description={item.workspace_description}
                                                    user_id={item.user_id}
                                                />
                                            ))
                                        }
                                    </>
                                )
                                :
                                (<div className="font-poppins text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">No Workspaces Found.</div>)
                        }
                    </div>
                </div>
            </div >

            <SiteDialog
                openState={showModal}
                setOpenState={setShowModal}
                modal_heading="Create New Workspace"
                hide_modal_on_backdrop_click={true}
                roundedModal={true}
                roundness="10px"
                modal_max_width={400}
            >
                <form className="p-[20px]" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="pb-[15px]">
                        <label
                            htmlFor="cnw_name"
                            className="inline-block mb-[5px] font-poppins font-semibold text-[14px] text-zinc-900 dark:text-zinc-200"
                        >
                            Workspace Name <span className="text-red-600 dark:text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            id="cnw_name"
                            placeholder="eg. Full Stack Development"
                            {...register("workspaceName")}
                        />
                        {errors.workspaceName && (<div className="block mt-[5px] font-poppins text-[12px] text-red-600 dark:text-red-400">{errors.workspaceName?.message}</div>)}
                    </div>
                    <div className="pb-[15px]">
                        <label
                            htmlFor="cnw_dscr"
                            className="inline-block mb-[5px] font-poppins font-semibold text-[14px] text-zinc-900 dark:text-zinc-200"
                        >
                            Description <span className="font-normal text-[10px]">(Optional)</span>
                        </label>
                        <Input
                            type="text"
                            id="cnw_dscr"
                        />
                    </div>
                    <div className="text-right">
                        <Button
                            title="Create"
                            type="submit"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </SiteDialog>
        </>
    )
};

export default WorkSpace;