import { Navigate, RouteObject } from "react-router-dom";
import ICMS from "./ICMS";
import Ward from "./Ward";
import Dashboard from "./Dashboard";
import CarePlan from "./CarePlan";

const routes: { name: String, root: React.ReactNode, routes: RouteObject[] } = {
    name: "ICMS",
    root: <ICMS />,
    routes: [
        {
            path: "wards",
            element: <Ward />
        },
        {
            path: "dashboard",
            element: <Dashboard />,
        },
        { index: true, element: <Navigate to="dashboard" replace /> },
        {
            path: "care_plan",
            element: <CarePlan />
        }
    ],
}

export default routes;