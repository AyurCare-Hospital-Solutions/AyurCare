import { RouteObject } from "react-router-dom";
import DMMS from "./DMMS";
import ManufactureRequest from "./ManufactureRequest";
import ManageManufactureRequest from "./ManageManufactureRequest";
import Dashboard from "../DMMS/Dashboard";
import AddMedicineMaterials from "./MedicineMaterial/AddMedicineMaterial";
import MedicineMaterialTable from "./MedicineMaterial/MedicineMaterialTable";
import DMMSAnalyse from "./DMMSAnalyse";

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

        {
            path: "reports",
            element: <AddMedicineMaterials />
        },

        {
            path: "report02",
            element: <DMMSAnalyse />
        },

    ],
}

export default routes;