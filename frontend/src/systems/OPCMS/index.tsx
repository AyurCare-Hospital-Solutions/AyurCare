import { RouteObject } from "react-router-dom";
import Assessment from "./Assessment";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "OCMS",
    root: <p>OCMS</p>, // replace with main element
    routes: [
        {
            path:"/assesment",
            element:<Assessment />
        }
    ],
}

export default routes;