const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const originalDiss = '9ab1bef8-6991-47e8-a281-59c40a99c194';

const getResponses = async (dissId, responses) => {
  const newResponses = await prisma.disses.findMany({
    where: {
      originalDiss: dissId,
    },
  });

  if (newResponses.length == 0) {
    return responses;
  }

  responses = [...newResponses, ...responses];

  for (const diss of newResponses) {
    return await getResponses(diss.id, responses);
  }
};

(async () => {
  const testing = await getResponses(originalDiss, []);
  console.log(testing);
})();
