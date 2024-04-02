import { RouteObject } from "react-router-dom";
import ImsMain from "./ImsMain"
import Medicine from "./Medicine";
import Material from "./Material";
import Accessories from "./Accessories";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "IMS",
    root: <ImsMain />, // replace with main element
    routes: [
        // Register routes here
        {
            path: "medicine",
            element: <Medicine />
        },
        {
            path: "material",
            element: <Material />
        },
        {
            path: "accessories",
            element: <Accessories />
        }
    ],
}

export default routes;