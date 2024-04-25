import { RouteObject } from "react-router-dom";
import Assessment from "./Assessment";
import OPCMS_Home from "./Dashboard";

const routes: { name: string, root: React.ReactNode, routes: RouteObject[] } = {
    name: "OPCMS",
    root: <p>OPCMS</p>, // replace with main element
    routes: [
        {
            path: index,
            
        }
        {
            path:"assessment",
            element:<Assessment />
        },
        {
            path:"OPCMS_Home",
            element:<OPCMS_Home />
        }
    ],
}

export default routes;