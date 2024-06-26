const express = require('express');
const { authNoOp } = require('./middleware/auth');

// patch express to allow handling exceptions thrown by async functions
require('express-async-errors');

const app = express();
const errorhandler = require('./middleware/errorhandler')

const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(authNoOp)
app.use(express.json());
app.use(cors());


// register all routes
const routes = require('./routes/router');

app.use("/api", routes);

// add the error handler middleware last.
app.use(errorhandler());



module.exports = app;