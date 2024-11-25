import {
    createBrowserRouter
} from "react-router-dom";

// Pages & Components.
import App from "@/App";
import Homepage from "@/pages/Homepage";
import TrialAdvance from "@/pages/trialAdvance";
import Trial from "@/pages/trial";
import HowItWorks from "@/pages/howItWorks";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Register from "@/pages/auth-pages/register";
import Login from "@/pages/auth-pages/login";
import ForgotPassword from "@/pages/auth-pages/forgotPassword";
import ResetPassword from "@/pages/auth-pages/resetPassword";
import WorkSpace from "@/pages/user-area/workSpace";
import GeneralSettings from "@/pages/user-area/settings/generalSettings";
import PasswordSettings from "@/pages/user-area/settings/passwordSettings";
import ThemeSettings from "@/pages/user-area/settings/themeSettings";
import SingleWorkSpace from "@/pages/user-area/singleWorkSpace";
import PageNotFound from "@/pages/pageNotFound";

// Layouts
import BaseLayout from "@/layouts/baseLayout";
import UserAreaLayout from "@/layouts/userAreaLayout";


const WebRoutes = createBrowserRouter([
    {
        path: '*',
        element: <PageNotFound />
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Homepage />
            },
            {
                path: '/how-it-works',
                element: <HowItWorks />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/about',
                element: <About />
            },
        ],
    },
    {
        path: '/auth',
        element: <BaseLayout />,
        children: [
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'reset-password/:user_id/:token',
                element: <ResetPassword />
            },
        ]
    },
    {
        path: '/user',
        element: <UserAreaLayout />,
        children: [
            {
                path: 'my-workspaces/:user_id',
                element: <WorkSpace />,
            },
            {
                path: 'settings/:user_id',
                element: <GeneralSettings />
            },
            {
                path: 'settings/password/:user_id',
                element: <PasswordSettings />
            },
            {
                path: 'settings/theme/:user_id',
                element: <ThemeSettings />
            },
            {
                path: 'workspace/:workspace_id/:user_id',
                element: <SingleWorkSpace />,
            }
        ]
    },
    {
        path: "/try/:id",
        element: <TrialAdvance />
    },
    {
        path: "/try",
        element: <Trial />
    }
]);

export default WebRoutes;