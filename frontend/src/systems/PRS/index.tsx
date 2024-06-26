import { RouteObject } from "react-router-dom";
import PRS from "./PRS";
import Dashboard from "./Dashboard";
import Patients from "./PatientReg";
import Appointment from "./Appointment";
import ReportGen from "./ReportGen";
import PatientAdminPg from "./components/PatientReg/PatientAdminPg";

const routes: { name: String; root: React.ReactNode; routes: RouteObject[] } = {
  name: "PRS",
  root: <PRS />, // replace with main element
  routes: [
    // Register routes here
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: "patients",
      element: <Patients />,
    },
    {
      path: "appointment",
      element: <Appointment />,
    },
    {
      path: "report",
      element: <ReportGen />,
    },
    {
      path: "patient-Admin",
      element: <PatientAdminPg />,
    },
  ],
};

export default routes;
