require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3333);

app.use(require('./routes/auth'));
app.use(require('./routes/post'));

module.exports = app;
