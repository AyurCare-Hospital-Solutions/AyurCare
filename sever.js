const dotenv = require('dotenv');
dotenv.config();

// connect to db and create all tables
const db = require("./model");
db.createAll().then(startServer);

function startServer() {
    const express = require('express');

    // patch express to allow handling exceptions thrown by async functions
    require('express-async-errors');

    const app = express();
    const errorhandler = require('./middleware/errorhandler')

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());


    // register all routes
    const routes = require('./routes');
    let registerOk = routes.register(app);
    if (!registerOk) {
        console.error("One or more errors were encountered while registering routes. Exiting...")
        process.exit(1);
    }

    // add the error handler middleware last.
    app.use(errorhandler());

    const server = app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on ${server.address().port}`);
    })
}