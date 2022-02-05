const express = require('express');

const dissRouter = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

dissRouter.get('/', async (req, res) => {
  const disses = await prisma.disses.findMany();
  res.status(200).send(disses);
});

dissRouter.post('/create', async (req, res) => {
  const newDiss = await prisma.disses.create({
    data: {
      diss: req.body.diss,
    },
  });
  res.status(200).send(newDiss);
});

module.exports = dissRouter;
