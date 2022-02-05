const express = require('express');
const jwt = require('jsonwebtoken');

const dissRouter = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateJWT } = require('../Util');

const prisma = new PrismaClient();

dissRouter.get('/', async (req, res) => {
  const disses = await prisma.disses.findMany({
    include: {
      user: true,
    },
  });
  res.status(200).send(disses);
});

dissRouter.post('/create', authenticateJWT, async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const jwtToken = jwt.decode(token);

  const newDiss = await prisma.disses.create({
    data: {
      diss: req.body.diss,
      userId: jwtToken.id,
    },
  });
  res.status(200).send(newDiss);
});

module.exports = dissRouter;
