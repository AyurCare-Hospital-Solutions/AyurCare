import { RouteObject } from "react-router-dom";
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
            element: <Dashboard />,
            index: true,
        },
        {
            path: "care_plan",
            element: <CarePlan />
        }
    ],
}

export default routes;