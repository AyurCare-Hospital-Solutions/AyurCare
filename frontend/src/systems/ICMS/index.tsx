import { RouteObject } from "react-router-dom";
import ICMS from "./ICMS";
import Ward from "./Ward";
import Dashboard from "./Dashboard";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "ICMS",
    root: <ICMS />,
    routes: [
        {
            path: "wards",
            element: <Ward />
        },
        {
            path: "dashboard",
            element: <Dashboard />,
        }
    ],
}

export default routes;