import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function id(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    if (!id) {
      res.status(404);
      res.end();
      return;
    }

    const prisma = new PrismaClient();

    const product = await prisma.product.findUnique({ where: { id } });

    if (product) {
      res.status(200).json(product);
      res.end();
    } else {
      res.status(404);
      res.end();
    }
  } catch {
    res.status(500);
  }
}
