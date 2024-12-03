const { default: mongoose } = require("mongoose");
require('dotenv').config();

const { DATABASE_URI_LOCAL, DATABASE_URI_ATLAS } = process.env;

const gtprotrcapp_mdb = async () => {
    mongoose.connect(DATABASE_URI_LOCAL)
        .then(console.log('Database Connected Successfully.'))
        .catch((err) => console.log(err));
};

module.exports = gtprotrcapp_mdb;