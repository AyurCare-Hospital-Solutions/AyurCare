import { RouteObject } from "react-router-dom";
import HRMS from "./HRMS";
import Leave from "./components/Leave";
import LeaveType from "./components/LeaveType";

const routes: { name: string, root: React.ReactNode, routes: RouteObject[] } = {
    name: "HRMS",
    root: <HRMS/>, 
    routes: [
        {
            path: "leaveRequests",
            element: <Leave/>,
        },
        {
            path: "leaveTypes",
            element: <LeaveType />,
        }

    ],
}

export default routes;