const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('node:path');
const axios = require('axios');
const app = express();
const PORT = 3002;

app.use(cors());
dotenv.config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

// UPDATE - This needs to be changed depending on dev or local
const corsOptions = {
    origin: process.env.CORS_OPTION,
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

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
