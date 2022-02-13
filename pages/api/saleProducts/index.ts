import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { SaleProduct } from '@/schema/product';

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const prisma = new PrismaClient({ log: ['query'] });

    const today = new Date();
    const saleProductEntities = await prisma.product.findMany({
      include: { Sale: { where: { start: { lte: today }, end: { gt: today } } } },
    });
    const response = saleProductEntities.map((entity) => {
      const saleProduct: SaleProduct = {
        id: entity.id,
        description: entity.description,
        name: entity.name,
        price: entity.price,
        image: entity.image,
        isSale: false,
      };

      if (entity.Sale.length > 0) {
        saleProduct.isSale = true;
        saleProduct.salePrice = entity.Sale[0].newPrice;
      }

      return saleProduct;
    });

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
