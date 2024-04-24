import { RouteObject } from "react-router-dom";
import ICMS from "./ICMS";
import WardManager from "./WardManager";
import Dashboard from "./Dashboard";
import PatientDetails from "./PatientDetails";
import PatientList from "./PatientList";
import WaitListManager from "./WaitListManager";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "ICMS",
    root: <ICMS />,
    routes: [
        {
            path: "wards",
            element: <WardManager />
        },
        {
            element: <Dashboard />,
            index: true,
        },
        {
            element: <WaitListManager />,
            path: "wait_list"
        },
        {
            path: "patient",
            element: <PatientList />,
        },
        {
            path: "patient/:admissionId",
            element: <PatientDetails />
        }
    ],
}

export default routes;