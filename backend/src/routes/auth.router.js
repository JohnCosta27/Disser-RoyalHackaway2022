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

const signToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET);
};

module.exports = authRouter;
