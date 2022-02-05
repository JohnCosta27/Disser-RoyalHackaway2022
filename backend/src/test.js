const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

prisma.disses
  .create({
    data: {
      diss: 'This is a reply to testing #1',
      userId: 'a5eb24f8-ecef-40b3-8491-a386e9839dad',
      originalDiss: '51a8b089-ff61-43b0-b312-3953a823347b',
    },
  })
  .then((response) => {
    console.log(response);
  });
