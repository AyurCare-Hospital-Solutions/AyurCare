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
import ocms from "./systems/OCMS";
import pms from "./systems/PMS";
import prs from "./systems/PRS";
import Login from "./Login";

let routes: Map<String, RouteObject> = new Map();

const importedRoutes = [acs, dmms, hrms, icms, ims, ocms, pms, prs];
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
}, {
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
