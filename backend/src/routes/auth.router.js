const express = require('express');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateJWT } = require('../Util');

const prisma = new PrismaClient();

authRouter.post('/register', async (req, res) => {
  try {
    const newUser = await prisma.users.create({
      data: {
        email: req.body.email,
        username: req.body.username,
      },
    });
    res.status(200).send({ ...newUser, token: signToken({ id: newUser.id }) });
  } catch (error) {
    res.status(400).send({ error: 'User already created' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username: req.body.username,
      },
    });
    res.status(200).send({ ...user, token: signToken({ id: user.id }) });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Credentials invalid' });
  }
});

authRouter.get('/user', async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: req.query.userId,
      },
      include: {
        disses: true,
        dissesLikes: true,
      },
    });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: 'Credentials invalid' });
  }
});

const signToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET);
};

module.exports = authRouter;
