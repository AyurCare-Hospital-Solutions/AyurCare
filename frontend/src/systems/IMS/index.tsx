import { RouteObject } from "react-router-dom";
import ImsMain from "./ImsMain"
import Medicine from "./Medicine";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "IMS",
    root: <ImsMain />, // replace with main element
    routes: [
        // Register routes here
        {
            path: "medicine",
            element: <Medicine />
        }
    ],
}

export default routes;