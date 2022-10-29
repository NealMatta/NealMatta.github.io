const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3001;

app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000',
};
const requestEndpoint =
    'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' +
    process.env.REACT_APP_CTA_API +
    '&mapid=40380&max=5';

app.get('/getCTA', cors(corsOptions), async (req, res) => {
    axios.get(requestEndpoint).then(resp => {
        // resp.data
    });
    const jsonResponse = { users: ['u1', 'u2', 'u3'] };
    res.json(jsonResponse);
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
