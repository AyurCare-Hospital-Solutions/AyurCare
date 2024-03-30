import { RouteObject } from "react-router-dom";
import HRMS from "./HRMS";
import Leave from "./components/Leave";

const routes: { name: string, root: React.ReactNode, routes: RouteObject[] } = {
    name: "HRMS",
    root: <HRMS/>, // replace with main element
    routes: [
        {
            path: "leave",
            element: <Leave/>,
        }

    ],
}

export default routes;