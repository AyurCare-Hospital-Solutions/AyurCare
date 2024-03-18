const { Sequelize } = require("sequelize");

function connect() {
    let config;
    if (Number.parseInt(process.env.USE_SQLITE)) {
        // config for a local sqlite db
        config = {
            dialect: "sqlite",
            storage: "local_db.sqlite",
        };

        console.log("Using local sqlite db");
    } else {
        // configure connection for mysql using .env 

        let port = process.env.MYSQL_PORT ? Number.parseInt(process.env.MYSQL_PORT) : undefined;

        config = {
            dialect: "mysql",
            host: process.env.MYSQL_HOST,
            port: port,
            database: process.env.MYSQL_DATABASE,
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
        };

        let emptyOk = ["password", "port"];

        // validate config
        for (const k in config) {
            if (emptyOk.indexOf(k) != -1 && !config[k]) {
                console.error(`MYSQL_${k.toUpperCase()} is not set in env`)
            }
        }

        console.log(`Using ${process.env.MYSQL_DB} on ${process.env.MYSQL_HOST}`)
    }

    return new Sequelize(config);
}

const sequelize = connect();

async function createAll() {
    console.log("Loading all defined models...")
    let glob = require('glob')
    let path = require('path');

    glob.sync('./model/*.js').forEach(function (file) {
        require(path.resolve(file));
    });
    console.log("loaded")

    console.log("Loaded all models.")

    let syncConfig = { force: false };
    if (Number.parseInt(process.env.SQL_SYNC_FORCE)) {
        console.log("Dropping existing tables")
        syncConfig.force = true;
    }

    if (!Number.parseInt(process.env.SQL_SYNC_DEBUG)) {
        syncConfig.logging = () => { }
    }

    console.log("Synchronizing database with models...");
    //await sequelize.sync(syncConfig);
    console.log("Finished synchronizing database.")
}


module.exports = { sequelize, createAll };