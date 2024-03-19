import { RouteObject } from "react-router-dom";
// @ts-ignore
import MedicineTable from "./component/MedicineTable"

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "IMS",
    root: <p>IMS</p>, // replace with main element
    routes: [
        // Register routes here
        {
            path : "medicine",
            element: <MedicineTable/>
        }
    ],
}

export default routes;