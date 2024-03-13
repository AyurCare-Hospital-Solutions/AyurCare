const { Sequelize } = require("sequelize");

function connect() {
    let config;
    if (process.env.USE_SQLITE) {
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

        // validate config
        for (const k in config) {
            if (!config[k]) {
                throw new Error(`MYSQL_${k.toUpperCase()} is not set in env`)
            }
        }

        console.log(`Using ${process.env.MYSQL_DB} on ${process.env.MYSQL_HOST}`)
    }

    return new Sequelize(config);
}

const sequelize = connect();

async function createAll() {
    console.log("Creating tables for all defined models.")
    let glob = require('glob')
    let path = require('path');

    glob.sync('./model/*.js').forEach(function (file) {
        require(path.resolve(file));
    });

    await sequelize.sync();
    console.log("Finished creating tables.")
}


module.exports = { sequelize, createAll };