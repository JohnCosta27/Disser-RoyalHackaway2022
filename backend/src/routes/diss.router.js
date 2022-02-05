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

dissRouter.get('/replies', async (req, res) => {
  if (req.query.dissId == undefined) {
    res.status(400).send({ error: 'Diss ID cannot be null' });
  } else {
    const replies = await getResponses(req.query.dissId, []);
    res.status(200).send(replies);
  }
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

dissRouter.post('/reply', authenticateJWT, async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const jwtToken = jwt.decode(token);

  const newResponseDiss = await prisma.disses.create({
    data: {
      diss: req.body.diss,
      userId: jwtToken.id,
      originalDiss: req.body.originalDiss,
    },
  });

  res.status(200).send(newResponseDiss);
});

const getResponses = async (dissId, responses) => {
  const newResponses = await prisma.disses.findMany({
    where: {
      originalDiss: dissId,
    },
  });

  console.log('New responses');
  console.log(newResponses);

  if (newResponses.length == 0) {
    return responses;
  }

  responses = [...newResponses, ...responses];

  for (const diss of newResponses) {
    return await getResponses(diss.id, responses);
  }
};

module.exports = dissRouter;
