const db = require("../model");

// setup database for tests
module.exports = async () => {
    await db.createAll()
}