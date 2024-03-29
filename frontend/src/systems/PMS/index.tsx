import { RouteObject } from "react-router-dom";
import Pms from "./Pms";
import Dashboard from "./Dashboard";




const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "PMS",
    root: <Pms /> , // replace with main element
    routes: [
        {
            path: "dashboard",
            element: <Dashboard />
        },

        {
            path: "medicines",
            element: <Dashboard />
        },

        {
            path: "dashboard",
            element: <Dashboard />
        },

        {
            path: "dashboard",
            element: <Dashboard />
        }

    ],
}

export default routes;