import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { tokenValidationSchema } from 'validationSchema/tokens';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.token
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTokenById();
    case 'PUT':
      return updateTokenById();
    case 'DELETE':
      return deleteTokenById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTokenById() {
    const data = await prisma.token.findFirst(convertQueryToPrismaUtil(req.query, 'token'));
    return res.status(200).json(data);
  }

  async function updateTokenById() {
    await tokenValidationSchema.validate(req.body);
    const data = await prisma.token.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTokenById() {
    const data = await prisma.token.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
