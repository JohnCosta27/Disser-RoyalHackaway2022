const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const test = await prisma.disses.create({
  data: {
    diss: 'testing many to many',
    userId: 'a5eb24f8-ecef-40b3-8491-a386e9839dad',
  },
});
