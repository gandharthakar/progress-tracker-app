import AddNewFuncs from "@/components/addNewFuncs";
import LabelWrapper from "@/components/labelWrapper";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NavLink, useParams } from "react-router-dom";

const SingleWorkSpace = () => {

    console.log("Re-Render.");
    const { workspace_id, user_id } = useParams();
    // const isLoading = false;

    return (
        <>
            <input type="hidden" value={workspace_id} />
            <div className="py-[25px] md:py-[50px] bg-zinc-50 dark:bg-zinc-900">
                <div className="site-container">
                    <div className="flex items-center justify-between flex-wrap gap-y-[10px] gap-x-[20px]">
                        <div>
                            <div className="pb-[5px]">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <NavLink to={`/user/my-workspaces/${user_id}`} title="My Workspaces">
                                                    My Workspaces
                                                </NavLink>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Workspace Name</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <h1 className="font-poppins font-semibold text-[18px] md:text-[22px] text-zinc-900 dark:text-zinc-200">
                                Workspace Name
                            </h1>
                        </div>
                        <div>
                            <AddNewFuncs />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-[25px] bg-white dark:bg-zinc-950">
                <div className="site-container">
                    <LabelWrapper />
                </div>
            </div>
        </>
    )
};

export default SingleWorkSpace;