const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());




const server = app.listen(process.env.PORT || 5000, () => {
    console.log(process.env.PORT);
    console.log(`Server is running on ${server.address().port}`);
})
