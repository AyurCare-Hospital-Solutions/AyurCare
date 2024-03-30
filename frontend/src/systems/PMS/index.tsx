import { RouteObject } from "react-router-dom";
import Pms from "./Pms";
import Dashboard from "./Dashboard";
import Medicine from "./Medicine";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "PMS",
    root: <Pms /> ,
    
    // if we want to go this section this is the Component
    routes: [
        {
            path: "dashboard",
            element: <Dashboard />
        },

        {
            path: "medicines",
            element: <Medicine />
        }

    ],
}

export default routes;