import { RouteObject } from "react-router-dom";
import ICMS from "./ICMS";
import WardManager from "./WardManager";
import Dashboard from "./Dashboard";
import PatientDetails from "./PatientDetails";
import PatientList from "./PatientManagement";
import WaitListManager from "./WaitListManager";
import WardDetails from "./WardDetails";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "ICMS",
    root: <ICMS />,
    routes: [
        {
            path: "ward",
            element: <WardManager />
        },
        {
            path: "ward/:wardId",
            element: <WardDetails />
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