const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('node:path');
const axios = require('axios');
const app = express();

app.use(cors());
dotenv.config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

let port = process.env.PORT;
if (port == null || port == '') {
    port = 3002;
}

var corsWhitelist = [
    `http://localhost:${port}/getCTA`,
    'cta-api-v1--mellow-figolla-a02b1d.netlify.app',
    'mellow-figolla-a02b1d.netlify.app',
];

var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

const requestEndpoint =
    'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' +
    process.env.CTA_API +
    '&mapid=41450&max=4&outputType=JSON';

app.get('/getCTA', cors(corsOptions), async (req, res) => {
    const response = await axios.get(requestEndpoint);
    let cleanData = {};

    // Removing the root level object before passing it off to make it easier to send the data
    Object.values(response.data).map(item => {
        cleanData = item;
    });

    res.json(cleanData);
});

app.get('/api', (req, res) => {
    res.json({ users: ['u1', 'u2', 'u3'] });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
