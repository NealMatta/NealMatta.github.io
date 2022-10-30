const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const axios = require('axios');
const app = express();
const PORT = 3002;

app.use(cors());
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:3000',
};
const requestEndpoint =
    'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' +
    process.env.REACT_APP_CTA_API +
    '&mapid=40380&max=5';

app.get('/getCTA', cors(corsOptions), async (req, res) => {
    const response = await axios.get(requestEndpoint);
    res.json(response.data);
});

app.get('/CTAapi', (req, res) => {
    res.json({ users: ['u1', 'u2', 'u3'] });
});

app.get('/api', (req, res) => {
    res.json({ users: ['u1', 'u2', 'u3'] });
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
