const express = require("express");

function registerAll(app) {
    let glob = require('glob')
    let path = require('path');

    let success = true;

    glob.sync('./routes/*.js').forEach(function (file) {
        if (file.endsWith("index.js")) {
            return;
        }

        const filename = path.basename(file);

        // import the file
        let routeFunc;
        try {
            routeFunc = require(path.resolve(file));
        } catch (ex) {
            console.error(`RouteError: Failed to load ${filename}`);
            console.error(ex);
            success = false;
            return;
        }

        // register routes from the file
        try {
            const routeBase = "/" + filename.split(".")[0].toLowerCase();

            app.use(routeBase, routeFunc)
            console.log(`Registered routed from ${filename} at ${routeBase}/`)
        } catch (ex) {
            console.error(`RouteError: An exception was thrown while registering routes in ${filename}`)
            console.error(ex)
            success = false;
            return;
        }
    });



    return success;
}

module.exports = { register: registerAll }