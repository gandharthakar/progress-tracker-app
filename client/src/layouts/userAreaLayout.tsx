import UserAreaHeader from '@/components/user-area/header';
import ThemeChecker from '@/utils/themeChecker';
import { Outlet } from 'react-router-dom';

const UserAreaLayout = () => {
    return (
        <>
            <UserAreaHeader />
            <Outlet />
            <ThemeChecker />
        </>
    );
};

export default UserAreaLayout;