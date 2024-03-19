import { RouteObject } from "react-router-dom";



export default function (): { name: String, root: React.ReactNode, routes: RouteObject[] } {
    return {
        name: "ACS",
        root: <p>ACM</p>, // replace with main element
        routes: [
            // Register routes here

        ],
    }

}
