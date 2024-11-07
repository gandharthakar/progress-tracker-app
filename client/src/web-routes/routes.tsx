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

const WebRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '',
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
            }
        ],
    },
    {
        path: '/auth/register',
        element: <Register />
    },
    {
        path: '/auth/login',
        element: <Login />
    },
    {
        path: '/auth/forgot-password',
        element: <ForgotPassword />
    },
    {
        path: '/auth/reset-password/:token/:user_id',
        element: <ResetPassword />
    },
    {
        path: "/try",
        element: <Trial />
    }
]);

export default WebRoutes;