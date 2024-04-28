import { RouteObject } from "react-router-dom";
import ICMS from "./ICMS";
import Ward from "./Ward";
import Dashboard from "./Dashboard";
import PatientDetails from "./PatientDetails";
import PatientList from "./PatientList";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "ICMS",
    root: <ICMS />,
    routes: [
        {
            path: "wards",
            element: <Ward />
        },
        {
            element: <Dashboard />,
            index: true,
        },
        {
            path: "patient",
            element: <PatientList />,
        },
        {
            path: "patient/:patientId",
            element: <PatientDetails />
        }
    ],
}

export default routes;