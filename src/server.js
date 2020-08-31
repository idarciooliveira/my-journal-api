require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3333);
app.use(require('./routes/auth'));
app.use(require('./routes/category'));
app.use(require('./routes/post'));
app.use(require('./routes/index'));

module.exports = app;
