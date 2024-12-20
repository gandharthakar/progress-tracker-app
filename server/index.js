const express = require("express");
require('dotenv').config();
const routes = require("./routes/routes");
const gtprotrcapp_mdb = require("./mongodb/dbconfig/dbconfig");
const cors = require('cors');

const port = process.env.PORT || 48256;
gtprotrcapp_mdb();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:4173", "https://progress-tracker-app.netlify.app", "https://progress-tracker-app.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))
app.use(routes);

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
})