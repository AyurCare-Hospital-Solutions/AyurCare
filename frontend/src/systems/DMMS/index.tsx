import { RouteObject } from "react-router-dom";
import DMMS from "./DMMS";
import ManufactureRequest from "./ManufactureRequest";
import ManageManufactureRequest from "./ManageManufactureRequest";
import Dashboard from "../DMMS/Dashboard";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {

    name: "DMMS",
    root: <p><DMMS /></p>, // replace with main element
    routes: [
        {
            index: true,
            element: <Dashboard />
        },

        {
            path: "reqMedicine",
            element: <ManufactureRequest />
        },

        {
            path: "mgMedicine",
            element: <ManageManufactureRequest />
        },

    ],
}

export default routes;