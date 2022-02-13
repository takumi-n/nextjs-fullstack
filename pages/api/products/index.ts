import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const prisma = new PrismaClient();

    const response = await prisma.product.findMany();

    if (response.length) {
      res.status(200).json(response);
      res.end();
    } else {
      res.status(404);
      res.end();
    }
  } catch {
    res.status(500);
  }
}
