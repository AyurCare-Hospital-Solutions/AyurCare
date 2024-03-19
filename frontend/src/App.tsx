import { ReactElement, useEffect, useState } from "react";
import { Link, RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";

let routes: Map<String, RouteObject> = new Map();

const loadRoutes = async () => {
  const load = async (name: String, module: any) => {
    let route = (await module).default();
    routes.set(route.name, { path: "/" + name, element: route.root, children: route.routes })
  }

  await load("acs", import("./systems/ACS"));
  await load("dmms", import("./systems/DMMS"));
  await load("hrms", import("./systems/HRMS"));
  await load("icms", import("./systems/ICMS"));
  await load("ims", import("./systems/IMS"));
  await load("ocms", import("./systems/OCMS"));
  await load("pms", import("./systems/PMS"));
  await load("prs", import("./systems/PRS"));

}


function TempMain() {
  let links: ReactElement[] = [];
  routes.forEach((v, k) => {
    links.push(<div><Link to={v.path!}>{k}</Link></div>)
  })

  return links;
}





export default () => {
  let [router, setRouter] = useState<any>(null);

  useEffect(() => {
    loadRoutes().then(() => {
      setRouter(createBrowserRouter([{
        path: "/",
        element: <TempMain />
      }, ...routes.values()]))
    })
  }, [])



  return <>
    {router ? <RouterProvider router={router} /> : ""}
  </>
}