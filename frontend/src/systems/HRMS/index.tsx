import { RouteObject } from "react-router-dom";
import HRMS from "./HRMS";
import LeaveType from "./components/LeaveType";
import LeaveRequest from "./components/LeaveRequest";
import MyLeaveRequest from "./components/MyLeaveRequest";

const routes: { name: string; root: React.ReactNode; routes: RouteObject[] } = {
  name: "HRMS",
  root: <HRMS />,
  routes: [
    {
      path: "leaveRequests",
      element: <LeaveRequest />,
    },
    {
      path: "leaveTypes",
      element: <LeaveType />,
    },
    {
      path: "myLeaveRequests",
      element: <MyLeaveRequest />,
    },
  ],
};

export default routes;
