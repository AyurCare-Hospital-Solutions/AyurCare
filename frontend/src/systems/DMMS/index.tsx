import { RouteObject } from "react-router-dom";
import DMMS from "./DMMS";
import ManufactureRequest from "./ManufactureRequest";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {

    name: "DMMS",
    root: <p><DMMS /></p>, // replace with main element
    routes: [
        {
            index: true,
            element: <DMMS />
        },
        /*
        {
            path: "manufactureRequest",
            element: <ManufactureRequest />
        },
        */

        {
            path: "reqMedicine",
            element: <ManufactureRequest />
        },

    ],
}

export default routes;