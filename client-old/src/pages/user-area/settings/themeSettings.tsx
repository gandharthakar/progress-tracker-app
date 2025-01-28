import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SettingsNav from "@/components/user-area/settingsNav";
import { NavLink, useParams } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useThemeStore } from "@/zustand/store";
import { ThemeStore } from "@/types/zustandTypes";

const ThemeSettings = () => {

    const { user_id } = useParams();
    const { theme, setTheme } = useThemeStore();

    const handleThemeChange = (selectedTheme: ThemeStore['theme']) => {
        setTheme(selectedTheme);
        // Store the selected theme in local storage
        localStorage.setItem('theme', JSON.stringify(selectedTheme));
    };

    return (
        <>
            <div className="py-[25px] md:py-[50px] bg-theme-grey-1 dark:bg-zinc-900">
                <div className="site-container">
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
                                    <BreadcrumbLink asChild>
                                        <NavLink to={`/user/settings/${user_id}`} title="Settings">
                                            Settings
                                        </NavLink>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Theme</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <h1 className="font-poppins font-semibold text-[18px] md:text-[22px] text-zinc-900 dark:text-zinc-200">
                        Settings
                    </h1>
                </div>
            </div>

            <div className="py-[25px] md:py-[50px] min-h-[100vh] bg-white dark:bg-zinc-950">
                <div className="site-container">
                    <div className="flex flex-col mdl-1:flex-row gap-x-[30px] gap-y-[25px]">
                        <div className="w-full max-w-none min-w-[auto] mdl-1:max-w-[300px] mdl-1:min-w-[300px]">
                            <SettingsNav user_id={user_id ?? ""} />
                        </div>
                        <div className="w-full mdl-1:flex-1">
                            <div className="p-[20px] border border-solid border-zinc-200 dark:border-zinc-800 rounded-[7px]">
                                <div className="pb-[15px]">
                                    <h2 className="font-poppins text-[16px] md:text-[18px] font-semibold text-zinc-950 dark:text-zinc-100">
                                        Theme Settings
                                    </h2>
                                </div>
                                <div className="pb-[15px]">
                                    <label
                                        className="font-poppins text-[14px] text-zinc-900 dark:text-zinc-200 inline-block pb-[5px]"
                                    >
                                        Select Theme
                                    </label>
                                    <Select
                                        defaultValue={theme}
                                        onValueChange={(value) => {
                                            handleThemeChange(value);
                                        }}
                                    >
                                        <SelectTrigger className="w-full text-zinc-900 dark:text-zinc-200">
                                            <SelectValue placeholder="Theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem className="py-[10px]" value="light">Light</SelectItem>
                                            <SelectItem className="py-[10px]" value="dark">Dark</SelectItem>
                                            <SelectItem className="py-[10px]" value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ThemeSettings;