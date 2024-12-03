import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ThemeChecker from '@/utils/themeChecker';
import ACLoginRedirect from '@/utils/acLoginRedirect';

const AuthBaseLayout = () => {

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
            <ACLoginRedirect />
            <Outlet />
            <ThemeChecker />
        </>
    );
};

export default AuthBaseLayout;