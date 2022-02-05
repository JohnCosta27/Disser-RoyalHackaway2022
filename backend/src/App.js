const express = require('express');

const app = express();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

prisma.testing.create({
  data: {
    name: 'Alice',
    email: 'alice@prisma.io',
  },
});

app.get('/', (req, res) => {
  res.status(200).json({ data: 'Hello World' });
});

app.listen(5000, () => console.log('Server running'));
