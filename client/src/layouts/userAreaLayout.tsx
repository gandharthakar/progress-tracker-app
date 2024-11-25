import UserAreaHeader from '@/components/user-area/header';
import ThemeChecker from '@/utils/themeChecker';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const UserAreaLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // "document.documentElement.scrollTo" is the magic for React Router Dom v6
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Optional if you want to skip the scrolling animation
        });
    }, [pathname]);

    return (
        <>
            <UserAreaHeader />
            <Outlet />
            <ThemeChecker />
        </>
    );
};

export default UserAreaLayout;