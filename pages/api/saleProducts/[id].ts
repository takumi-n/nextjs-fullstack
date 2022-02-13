import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { SaleProduct } from '@/schema/product';

export default async function id(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    if (!id) {
      res.status(404);
      res.end();
      return;
    }

    const prisma = new PrismaClient();

    const entity = await prisma.product.findUnique({ where: { id }, include: { Sale: true } });

    if (entity) {
      const isSale = entity.Sale.length > 0;
      const salePrice = entity.Sale[0]?.price;

      const saleProduct: SaleProduct = {
        id: `${entity.id}`,
        description: entity.description,
        name: entity.name,
        price: entity.price,
        image: entity.image,
        isSale,
        salePrice,
      };

      res.status(200).json(saleProduct);
    } else {
      res.status(404);
      res.end();
    }
  } catch {
    res.status(500);
  }
}
