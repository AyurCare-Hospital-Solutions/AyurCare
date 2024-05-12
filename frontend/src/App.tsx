import { ReactElement } from "react";
import {
  Link,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import acs from "./systems/ACS";
import dmms from "./systems/DMMS";
import hrms from "./systems/HRMS";
import icms from "./systems/ICMS";
import ims from "./systems/IMS";
import opcms from "./systems/OPCMS";
import pms from "./systems/PMS";
import prs from "./systems/PRS";
import Login from "./Login";
import MyLeaveRequest from "./systems/HRMS/components/MyLeaveRequest";
import Shifts from "./systems/HRMS/components/Shifts";

let routes: Map<String, RouteObject> = new Map();

const importedRoutes = [acs, dmms, hrms, icms, ims, opcms, pms, prs];
importedRoutes.forEach((route) => {
  routes.set(route.name, {
    path: "/" + route.name.toLowerCase(),
    element: route.root,
    children: route.routes,
  });
});

function TempMain() {
  let links: ReactElement[] = [];
  routes.forEach((v, k) => {
    links.push(
      <div>
        <Link to={v.path!}>{k}</Link>
      </div>
    );
  });

  return links;
}

const domRouter = createBrowserRouter([{
  path: "/",
  element: <Login />
},
{
  path: "/leave_request",
  element: <MyLeaveRequest />
},
{
  path: "/shifts",
  element: <Shifts />

},
{
  path: "/dev",
  element: <TempMain />
}, ...routes.values()],)


function App() {
  return (
    <>

      <RouterProvider router={domRouter} />

    </>
  );
}

export default App;
