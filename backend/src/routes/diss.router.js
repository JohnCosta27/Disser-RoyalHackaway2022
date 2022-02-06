const express = require('express');
const jwt = require('jsonwebtoken');
const EventEmitter = require('events');

const dissRouter = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateJWT } = require('../Util');

const prisma = new PrismaClient();

const emitter = new EventEmitter();

dissRouter.get('/', async (req, res) => {
  const disses = await prisma.disses.findMany({
    where: {
      originalDiss: null,
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

  const data = {
    diss: req.body.diss,
    userId: jwtToken.id,
  };
  const newDiss = await prisma.disses.create({
    data: data,
  });
  myEmitter.emit('new-diss', data);
  res.status(200).send(newDiss);
});

dissRouter.post('/reply', authenticateJWT, async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const jwtToken = jwt.decode(token);
  const data = {
    diss: req.body.diss,
    userId: jwtToken.id,
    originalDiss: req.body.originalDiss,
  };
  const newResponseDiss = await prisma.disses.create({
    data: data,
  });
  emitter.emit('new-diss-reply', data);
  res.status(200).send(newResponseDiss);
});

const getResponses = async (dissId, responses) => {
  const newResponses = await prisma.disses.findMany({
    where: {
      originalDiss: dissId,
    },
    include: {
      user: true,
    },
  });
  return newResponses;
};

module.exports = { dissRouter, emitter };
