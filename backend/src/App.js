const express = require('express');
const { dissRouter, emitter } = require('./routes/diss.router');
const authRouter = require('./routes/auth.router');
const bodyParser = require('body-parser');
const cors = require('cors');
const initServer = require('./websockets');
require('dotenv').config();

const app = express();

const ws = initServer(5005, emitter);

app.use(bodyParser.json());
app.use(cors());
app.use('/diss', dissRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.status(200).json({ data: 'Hello World' });
});

app.listen(5000, () => console.log('Server running'));
