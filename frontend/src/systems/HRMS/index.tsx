import { RouteObject } from "react-router-dom";



export default function (): { name: String, root: React.ReactNode, routes: RouteObject[] } {
    return {
        name: "HRMS",
        root: <p>HRMS</p>, // replace with main element
        routes: [
            // Register routes here

        ],
    }

}
