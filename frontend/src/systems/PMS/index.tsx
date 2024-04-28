import { RouteObject } from "react-router-dom";
import Pms from "./Pms";
import Dashboard from "./Pages/Dashboard";
import Medicine from "./Pages/MedicineManagement";
import Prescription from "./Pages/Prescription";
import ReceivedPrescription from "./Pages/ExternalPrescription";
import UserConcerns from "./Pages/UserConerns";
import InventeryRequest from "./Pages/InventeryRequest";
import Report from "./Pages/Report";
import Keep from "./Pages/Keep";
import UserGuide from "./Pages/UserGuide";

const routes: { name: String; root: React.ReactNode; routes: RouteObject[] } = {
  name: "PMS",
  root: <Pms />,

  // if we want to go this section this is the Component
  routes: [
    {
     index: true,
      element: <Dashboard />,
    },
    {
      path: "medicines",
      element: <Medicine />,
    },
    {
      path: "keep",
      element: <Keep />,
    },
    {
      path: "inventoryrequest",
      element: <InventeryRequest />,
    },
    {
      path: "prescriptionmanagement",
      element: <Prescription />,
    },
    {
      path: "userconcerns",
      element: <UserConcerns />,
    },
    {
      path: "receivedprescription",
      element: <ReceivedPrescription />,
    },
    {
      path: "reports",
      element: <Report />,
    },
    {
      path: "userguide",
      element: <UserGuide />,
    },
  ],
};

export default routes;
