import {
    createBrowserRouter
} from "react-router-dom";

// Pages & Components.
import App from "../App";
import Homepage from "@/pages/Homepage";
import Trial from "@/pages/trial";
import HowItWorks from "@/pages/howItWorks";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Register from "@/pages/auth-pages/register";
import Login from "@/pages/auth-pages/login";
import ForgotPassword from "@/pages/auth-pages/forgotPassword";
import ResetPassword from "@/pages/auth-pages/resetPassword";
import WorkSpace from "@/pages/user-area/workSpace";

// Layouts
import BaseLayout from "@/layouts/baseLayout";
import UserAreaLayout from "@/layouts/userAreaLayout";

const WebRoutes = createBrowserRouter([
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
                path: 'workspace/:user_id',
                element: <WorkSpace />,
            },
        ]
    },
    {
        path: "/try",
        element: <Trial />
    }
]);

export default WebRoutes;