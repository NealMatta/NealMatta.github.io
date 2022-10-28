const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

app.use(cors());
dotenv.config({ path: '../.env' });

app.get('/CTAapi', (req, res) => {
    const baseURL =
        'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' +
        process.env.REACT_APP_CTA_API +
        '&mapid=40380&max=5';

    res.json({ users: ['u1', 'u2', 'u3'] });
});

app.get('/api', (req, res) => {
    res.json({ users: ['u1', 'u2', 'u3'] });
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});
