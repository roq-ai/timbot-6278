import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { tradingParameterValidationSchema } from 'validationSchema/trading-parameters';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.trading_parameter
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTradingParameterById();
    case 'PUT':
      return updateTradingParameterById();
    case 'DELETE':
      return deleteTradingParameterById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTradingParameterById() {
    const data = await prisma.trading_parameter.findFirst(convertQueryToPrismaUtil(req.query, 'trading_parameter'));
    return res.status(200).json(data);
  }

  async function updateTradingParameterById() {
    await tradingParameterValidationSchema.validate(req.body);
    const data = await prisma.trading_parameter.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTradingParameterById() {
    const data = await prisma.trading_parameter.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
