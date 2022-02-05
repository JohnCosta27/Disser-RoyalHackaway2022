const express = require('express');
const dissRouter = require('./routes/diss.router');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/diss', dissRouter);

app.get('/', (req, res) => {
  res.status(200).json({ data: 'Hello World' });
});

app.listen(5000, () => console.log('Server running'));
