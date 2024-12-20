import SiteDialog from "@/components/SiteDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
// import demo_workspaces from "@/utils/demoData";
// import { SiteWorkspaceCompProps } from "@/types/componentsTypes";
import WorkspaceBox from "@/components/user-area/workspaceBox";
import { workspaceFormVS, workspaceFormValidationSchema } from "@/zod/schemas/userWorkspace";
import Swal from "sweetalert2";
// import { useParams } from "react-router-dom";
import { useGetUserInfo, useReadAllWorkspaces } from "@/tanstack-query/queries/queries";
import { CommonAPIResponse } from "@/types/tanstack-query/commonTypes";
import { useCreateWorkspace } from "@/tanstack-query/mutations/workspace/workspaceMutations";

const WorkSpace = () => {

    // const { user_id } = useParams();

    const [showModal, setShowModal] = useState<boolean>(false);
    // const [data, setData] = useState<SiteWorkspaceCompProps[]>([]);
    let tkn = null;
    const lsi = localStorage.getItem("Auth");
    if (lsi) {
        tkn = JSON.parse(lsi);
    }
    const rAWD = useReadAllWorkspaces(tkn);
    const [workspaceDscr, setWorkspaceDscr] = useState<string>('');
    const [userName, setUserName] = useState<string>("User");
    const isLoading = false;

    const { register, handleSubmit, reset, formState: { errors } } = useForm<workspaceFormVS>({
        resolver: zodResolver(workspaceFormValidationSchema)
    });

    const callbackOnSuc = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (resp.success) {
                const st = setTimeout(() => {
                    setShowModal(false);
                    setWorkspaceDscr("");
                    reset();
                    clearTimeout(st);
                }, 4000);
                Swal.fire({
                    title: "Success!",
                    text: resp.message,
                    icon: "success",
                    timer: 4000
                }).then((result) => {
                    if (result.isConfirmed) {
                        setShowModal(false);
                        setWorkspaceDscr("");
                        reset();
                        clearTimeout(st);
                    }
                });
            }
        }
    }

    const callbackOnErr = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (!resp.success) {
                Swal.fire({
                    title: "Error!",
                    text: resp.message,
                    icon: "error",
                    timer: 4000
                });
            }
        }
    }

    const callbackErr = (resp: (CommonAPIResponse | undefined)) => {
        if (resp) {
            if (!resp.success) {
                Swal.fire({
                    title: "Error!",
                    text: resp.message,
                    icon: "error",
                    timer: 4000
                });
            }
        }
    }

    const creWksp = useCreateWorkspace({
        onSuccessCB: (resp) => callbackOnSuc(resp),
        errorCB: (resp) => callbackErr(resp),
        onErrorCB: (resp) => callbackOnErr(resp),
        token: tkn
    });

    const handleFormSubmit: SubmitHandler<workspaceFormVS> = (formdata) => {
        const glsi = localStorage.getItem("Auth");
        if (glsi) {
            const prs_glsi = JSON.parse(glsi);
            const data = {
                workspace_title: formdata.workspaceName,
                workspace_description: workspaceDscr,
                user_id: prs_glsi
            }
            creWksp.mutate(data);
        }
    }

    const { data } = useGetUserInfo({
        token: tkn,
        required_data_code: "115521"
    });

    useEffect(() => {
        setUserName(data?.user?.user_full_name ?? "");
    }, [data]);

    return (
        <>
            <div className="py-[50px] md:py-[100px] px-[20px] text-center bg-theme-grey-1 dark:bg-zinc-900">
                <h1 className="text-[20px] md:text-[35px] font-poppins font-bold text-zinc-900 dark:text-zinc-200 break-words">
                    Welcome, {userName}
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
                            rAWD.data?.workspace.length ?
                                (
                                    <>
                                        {
                                            rAWD.data?.workspace.map((item) => (
                                                <WorkspaceBox
                                                    key={item.workspace_id}
                                                    workspace_id={item.workspace_id ?? ""}
                                                    workspace_title={item.workspace_title}
                                                    workspace_description={item.workspace_description ?? ""}
                                                    user_id={item.user_id ?? ""}
                                                />
                                            ))
                                        }
                                    </>
                                )
                                :
                                (<div className="block px-[20px] md:px-[30px] font-poppins text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">No Workspaces Found.</div>)
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
                            autoComplete="off"
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
                            value={workspaceDscr}
                            onChange={(e) => setWorkspaceDscr(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    <div className="text-right">
                        <Button
                            title={isLoading ? "Creating ..." : "Create"}
                            type="submit"
                            disabled={isLoading}
                        >
                            {
                                isLoading ?
                                    (<>
                                        <Loader2 className="animate-spin" />
                                        Creating ...
                                    </>)
                                    : ("Create")
                            }
                        </Button>
                    </div>
                </form>
            </SiteDialog>
        </>
    )
};

export default WorkSpace;