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
import VerifyEmail from "@/pages/auth-pages/verifyEmail";
import TokenChecker from "@/utils/tokenChecker";
import ReVerifyEmail from "@/pages/auth-pages/reVerifyEmail";
import LoginVerificationRedirect from "@/pages/auth-pages/loginVerificationRedirect";
import ACLoginRedirect from "@/utils/acLoginRedirect";

// Layouts
// import BaseLayout from "@/layouts/baseLayout";
import UserAreaLayout from "@/layouts/userAreaLayout";
import AuthBaseLayout from "@/layouts/authBaseLayout";

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
        element: <AuthBaseLayout />,
        children: [
            {
                path: 'register',
                element: <ACLoginRedirect><Register /></ACLoginRedirect>
            },
            {
                path: 'verify-email/:token',
                element: <VerifyEmail />
            },
            {
                path: 'login',
                element: <ACLoginRedirect><Login /></ACLoginRedirect>
            },
            {
                path: 'forgot-password',
                element: <ACLoginRedirect><ForgotPassword /></ACLoginRedirect>
            },
            {
                path: 'reset-password/:token',
                element: <ACLoginRedirect><ResetPassword /></ACLoginRedirect>
            },
            {
                path: 're-verify-email/:token',
                element: <ReVerifyEmail />
            },
        ]
    },
    {
        path: '/user',
        element: <UserAreaLayout />,
        children: [
            {
                path: 'my-workspaces/:user_id',
                element: <TokenChecker><WorkSpace /></TokenChecker>,
            },
            {
                path: 'settings/:user_id',
                element: <TokenChecker><GeneralSettings /></TokenChecker>,
            },
            {
                path: 'settings/password/:user_id',
                element: <TokenChecker><PasswordSettings /></TokenChecker>,
            },
            {
                path: 'settings/theme/:user_id',
                element: <TokenChecker><ThemeSettings /></TokenChecker>,
            },
            {
                path: 'workspace/:workspace_id/:user_id',
                element: <TokenChecker><SingleWorkSpace /></TokenChecker>,
                // element: <SingleWorkSpace />,
            }
        ]
    },
    {
        path: "/auth/re-verify/redirect",
        element: <TokenChecker><LoginVerificationRedirect /></TokenChecker>,
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