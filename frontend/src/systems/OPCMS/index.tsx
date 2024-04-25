import { RouteObject } from "react-router-dom";
import Assessment from "./Assessment";
import OPCMS from "./OPCMS";
import Dashboard from "./Dashboard";
import Appointments from "./Appointments";
import Records from "./Records";
import Reports from "./Reports";
import Analytics from "./Analytics";

const routes: { name: string; root: React.ReactNode; routes: RouteObject[] } = {
  name: "OPCMS",
  root: <OPCMS />,
  routes: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "assessment",
      element: <Assessment />,
    },
    {
      path: "appointments",
      element: <Appointments />,
    },
    {
      path: "records",
      element: <Records />,
    },
    {
      path: "reports",
      element: <Reports />,
    },
    {
      path: "analytics",
      element: <Analytics />,
    },
  ],
};

export default routes;
