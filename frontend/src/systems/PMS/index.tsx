import { RouteObject } from "react-router-dom";



export default function (): { name: String, root: React.ReactNode, routes: RouteObject[] } {
    return {
        name: "PMS",
        root: <p>PMS</p>, // replace with main element
        routes: [
            // Register routes here

        ],
    }

}
