import { RouteObject } from "react-router-dom";
import ICMS from "./ICMS";
import Ward from "./Ward";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "ICMS",
    root: <ICMS />, // replace with main element
    routes: [
        {
            path: "wards",
            element: <Ward />
        }
    ],
}

export default routes;