const express = require('express');
const dissRouter = require('./routes/diss.router');
const authRouter = require('./routes/auth.router');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/diss', dissRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.status(200).json({ data: 'Hello World' });
});

app.listen(5000, () => console.log('Server running'));
