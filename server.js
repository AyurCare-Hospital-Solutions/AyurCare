const express = require('express');

// patch express to allow handling exceptions thrown by async functions
require('express-async-errors');

const app = express();
const errorhandler = require('./middleware/errorhandler')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// register all routes
const routes = require('./routes/router');

app.use("/api", routes);

// add the error handler middleware last.
app.use(errorhandler());



module.exports = app;