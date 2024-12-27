const express = require('express');
const repasseRoutes = require('./routes/repasse-routes');

const app = express();
app.use(express.json());
app.use('/api/repasse', repasseRoutes);

module.exports = app;