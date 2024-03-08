const dotenv = require('dotenv');
dotenv.config();

// connect to db and create all tables
const db = require("./model");
db.createAll().then(() => {
    const app = require("./server");

    const server = app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on ${app.address().port}`);
    });

});
