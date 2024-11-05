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
        path: "/try",
        element: <Trial />
    }
]);

export default WebRoutes;