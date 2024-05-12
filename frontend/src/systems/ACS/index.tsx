import { RouteObject } from "react-router-dom";
import ACS from "./ACS";
import Staff from "./Staff";
import Dashboard from "./Dashboard";
import SupportTickets from "./SupportTickets";
import Reports from "./Reports";
import EditStaff from "./EditStaff";

const routes: { name: String; root: React.ReactNode; routes: RouteObject[] } = {
  name: "ACS",
  root: <ACS />, // replace with main element
  routes: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: "staff",
      element: <Staff />,
    },

    {
      path: "support_tickets",
      element: <SupportTickets />,
    },
    {
      path: "reports",
      element: <Reports />,
    },

    {
      path: "editStaff/:id",
      element: <EditStaff />,
    },
  ],
};

export default routes;
