const express = require("express");
const router = express.Router();

const register = (systemName, path) => {
    let routes;
    try {
        routes = require(path);
    } catch (ex) {
        console.error(`RouteError: Failed to load ${path}`);
        console.error(ex);
        return;
    }

    // register routes from the file
    try {
        router.use(systemName, routes)
    } catch (ex) {
        console.error(`RouteError: An exception was thrown while registering routes in ${path}`)
        console.error(ex)
        return;
    }
}

register("/acs", "./ACS");
register("/dms", "./DMS");
register("/hrms", "./HRMS");
register("/icms", "./ICMS");
register("/ims", "./IMS");
register("/ocms", "./OCMS");
register("/pms", "./PMS");
register("/prs", "./PRS");

module.exports = router;