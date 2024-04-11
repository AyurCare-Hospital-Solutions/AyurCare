import { RouteObject } from "react-router-dom";
import ImsMain from "./ImsMain"
import Medicine from "./Medicine";
import Material from "./Material";
import Accessories from "./Accessories";
import MedicineRequest from "./MedicineRequest";
import ManageMadicineRequests from "./ManageMedicineRequests";
import MaterialRequest from "./MaterialRequest";
import ManageMedicineRequests from "./ManageMedicineRequests";
import ManageMaterialRequests from "./ManageMatarialRequest";
import IMSHome from "./IMSHome";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "IMS",
    root: <ImsMain />, // replace with main element
    routes: [
        // Register routes here
        {
            index: true,
            element: <IMSHome />
        },
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
        },
        {
            path: "medicineRequests",
            element: <ManageMedicineRequests />
        },
        {
            path: "materialRequests",
            element: <ManageMaterialRequests />
        },
        {
            path: "reqMedicine",
            element: <MedicineRequest />
        },
        {
            path: "reqMaterial",
            element: <MaterialRequest />
        }
    ],
}

export default routes;