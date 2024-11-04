import {
    createBrowserRouter
} from "react-router-dom";

// Pages & Components.
import App from "../App";
import Homepage from "@/pages/Homepage";
import Trial from "@/pages/trial";

const WebRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '',
                element: <Homepage />
            }
        ],
    },
    {
        path: "/try",
        element: <Trial />
    }
]);

export default WebRoutes;