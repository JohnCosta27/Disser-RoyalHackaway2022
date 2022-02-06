const express = require('express');
const jwt = require('jsonwebtoken');
const EventEmitter = require('events');

const dissRouter = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateJWT } = require('../Util');

const prisma = new PrismaClient();

const emitter = new EventEmitter();

dissRouter.get('/', async (req, res) => {
  try {
    let disses = await prisma.disses.findMany({
      where: {
        originalDiss: null,
      },
      orderBy: {
        timestamp: 'desc',
      },
      include: {
        user: true,
        dissesLikes: true,
      },
    });
    for (let d of disses) {
      const responses = await getResponses(d.id, []);
      d.dissesResponses = responses.length;
    }
    res.status(200).send(disses);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

dissRouter.get('/replies', async (req, res) => {
  try {
    if (req.query.dissId == undefined) {
      res.status(400).send({ error: 'Diss ID cannot be null' });
    } else {
      const diss = await prisma.disses.findFirst({
        where: {
          id: req.query.dissId,
        },
        include: {
          user: true,
          dissesLikes: true,
        },
      });

      let replies = await getResponses(req.query.dissId, []);
      for (let d of replies) {
        const responses = await getResponses(d.id, []);
        d.dissesResponses = responses.length;
      }

      res.status(200).send({ original: diss, replies: replies });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

dissRouter.post('/create', authenticateJWT, async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const jwtToken = jwt.decode(token);

    const data = {
      diss: req.body.diss,
      userId: jwtToken.id,
    };
    const newDiss = await prisma.disses.create({
      data: data,
      include: {
        user: true,
        dissesLikes: true,
      },
    });
    emitter.emit('new-diss', newDiss);
    res.status(200).send(newDiss);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

dissRouter.post('/reply', authenticateJWT, async (req, res) => {
  try {
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
      include: {
        user: true,
        dissesLikes: true,
      },
    });
    emitter.emit('new-diss-reply', data);
    res.status(200).send(newResponseDiss);
  } catch (error) {
    res.status(400).send({ error: error });
  }
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
    emitter.emit('new-diss-like', newLike);
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
  try {
    const newResponses = await prisma.disses.findMany({
      where: {
        originalDiss: dissId,
      },
      orderBy: {
        timestamp: 'desc',
      },
      include: {
        user: true,
        dissesLikes: true,
      },
    });
    return newResponses;
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = { dissRouter, emitter };
