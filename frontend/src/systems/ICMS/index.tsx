import { RouteObject } from "react-router-dom";



export default function (): { name: String, root: React.ReactNode, routes: RouteObject[] } {
    return {
        name: "ICMS",
        root: <p>ICMS</p>, // replace with main element
        routes: [
            // Register routes here

        ],
    }

}
