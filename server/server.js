const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('node:path');
const axios = require('axios');
const app = express();

// Setting up the path for the ENV file
dotenv.config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

// get driver connection
const dbo = require('./db/conn');

// Setting the Port to be used
let port = process.env.PORT || 3002;

// List of whitelisted CORS Origin Values
var corsWhitelist = [
    `http://localhost:3000`,
    'https://mellow-figolla-a02b1d.netlify.app',
];

// Setting up CORS
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            if (corsWhitelist.indexOf(origin) === -1) {
                var msg =
                    'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    })
);

app.use(express.json());

const ctaRequestEndpoint =
    'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' +
    process.env.CTA_API +
    '&mapid=41450&max=4&outputType=JSON';

// CTA APIs
app.get('/getCTA', async (req, res) => {
    const response = await axios.get(ctaRequestEndpoint);
    let cleanData = {};

    // Removing the root level object before passing it off to make it easier to send the data
    Object.values(response.data).map(item => {
        cleanData = item;
    });

    res.json(cleanData);
});

// Testing API
app.get('/api', (req, res) => {
    res.json({ users: ['u1', 'u2', 'u3'] });
});

app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Example app listening at http://localhost:${port}`);
});
