const express = require("express");
require('dotenv').config();
const routes = require("./routes/routes.js");
const gtprotrcapp_mdb = require("./configs/dbconfig.js");

const port = process.env.PORT || 48256;
gtprotrcapp_mdb();

const app = express();
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
})