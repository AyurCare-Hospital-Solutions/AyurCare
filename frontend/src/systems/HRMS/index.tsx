import { RouteObject } from "react-router-dom";
import HRMS from "./HRMS";
import LeaveType from "./components/LeaveType";
import LeaveRequest from "./components/LeaveRequest";
import MyLeaveRequest from "./components/MyLeaveRequest";
import RosterManagement from "./components/RosterManagement";
import Shifts from "./components/Shifts";
import Reports from "./components/Reports";
import Chat from "./components/Chat";
import ShiftTypes from "./ShiftTypes";
import Dashboard from "./components/Dashboard";

const routes: { name: string; root: React.ReactNode; routes: RouteObject[] } = {
  name: "HRMS",
  root: <HRMS />,
  routes: [
    {
      index: true,
      element: <Dashboard />,
    },

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
    {
      path: "rosterManagement",
      element: <RosterManagement />,
    },
    {
      path: "shifts",
      element: <Shifts />,
    },
    {
      path: "reports",
      element: <Reports />,
    },
    {
      path: "chat",
      element: <Chat />,
    },
    {
      path: "shiftTypes",
      element: <ShiftTypes />,
    },
  ],
};

export default routes;
