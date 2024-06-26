const dotenv = require('dotenv');
dotenv.config({ path: ['.env.local', '.env'] });

// connect to db and create all tables
const db = require("./model");
db.createAll().then(() => {
    const app = require("./server");
    const server = app.listen(process.env.PORT, () => {
        console.log(`Server is running on ${server.address().port}`);
    });

});
