const express = require('express');
const jwt = require('jsonwebtoken');

const dissRouter = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateJWT } = require('../Util');

const prisma = new PrismaClient();

dissRouter.get('/', async (req, res) => {
  const disses = await prisma.disses.findMany({
    where: {
      originalDiss: null,
    },
    orderBy: {
      timestamp: 'desc',
    },
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
    const diss = await prisma.disses.findFirst({
      where: {
        id: req.query.dissId,
      },
      include: {
        user: true,
      },
    });

    const replies = await getResponses(req.query.dissId, []);
    res.status(200).send({ original: diss, replies: replies });
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

dissRouter.post('/like', authenticateJWT, async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const jwtToken = jwt.decode(token);

    const newLike = await prisma.dissesLikes.create({
      data: {
        dissId: req.body.dissId,
        userId: jwtToken.id,
      },
    });

    res.status(200).send(newLike);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'There has been an error' });
  }
});

dissRouter.get('/likes', authenticateJWT, async (req, res) => {
  try {
    const dissLikes = await prisma.dissesLikes.findMany({
      where: {
        dissId: req.query.dissId,
      },
    });
    res.status(200).send(dissLikes);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'There has been an error' });
  }
});

const getResponses = async (dissId, responses) => {
  const newResponses = await prisma.disses.findMany({
    where: {
      originalDiss: dissId,
    },
    orderBy: {
      timestamp: 'desc',
    },
    include: {
      user: true,
    },
  });
  return newResponses;
};

module.exports = dissRouter;
