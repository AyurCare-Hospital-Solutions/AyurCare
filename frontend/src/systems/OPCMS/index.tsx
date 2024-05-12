import { RouteObject } from "react-router-dom";
import OPCMS from "./OPCMS";
import Dashboard from "./Dashboard";
import Appointments from "./Appointments";
import Records from "./Records";
import Reports from "./Reports";
import Analytics from "./Analytics";
import Profile from "./Profile";

const routes: { name: string; root: React.ReactNode; routes: RouteObject[] } = {
  name: "OPCMS",
  root: <OPCMS />,
  routes: [
    {
      index: true,
      element: <Dashboard />,
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
    {
      path : "appointments/profile/:id/prescriptions/:appId",
      element: <Profile/>,
    }
  ],
};

export default routes;
