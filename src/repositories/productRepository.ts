import { Prisma, PrismaClient, Product } from "@prisma/client";
import ProductDTO, { ProductFilter, ProductTitles } from "../shared/models/product";
import IProductRepository from "./interfaces/productRepositoryInterface";

export class ProductRepository implements IProductRepository {
    private repository = new PrismaClient().product;

  async findMany(data: ProductFilter): Promise<ProductDTO[]> {
    const {
      companyId,
      description,
      endAt,
      imageUrl,
      promotionalPrice,
      regularPrice,
      startAt,
      subTitle,
      titles,
    } = data;
    const result = await this.repository.findMany({
      where: {
        startAt: {
          gte: startAt as Date | undefined,
        },
        endAt: {
          lte: endAt as Date | undefined,
        },
        title: {
          in: titles,
        },
        subTitle,
        companyId: companyId,
        promotionalPrice: {
          lt: data.maximumPromotionalPrice,
          gt: data.minimumPromotionalPrice,
        },
        regularPrice,
        description,
        imageUrl,
      },
      select: {
        id: true,
        title: true,
        subTitle: true,
        promotionalPrice: true,
        regularPrice: true,
        endAt: true,
        startAt: true,
        imageUrl: true,
        company: {
          select: {
            name: true,
          }
        }
      }
    });

    return result;
  }

  async create(data: Product): Promise<ProductDTO> {
    const result = await this.repository.create({ data });
    return result;
  }

  async selectOne(where: Prisma.ProductWhereInput): Promise<ProductDTO | null> {
    const result = await this.repository.findFirst({ 
      where,
      include: {
        company: {
          select: {
            name: true,
          }
        }
      }
    });
    return result;
  }

  async getTitles(endAt: Date): Promise<ProductTitles[]> {
    const titles = await this.repository.findMany({
      where: {
        endAt: {
          gt: endAt
        }
      },
      select: {
        title: true,
        id: true,
      },
      distinct: ['title'],
    });

    return titles;
  }

  async update({  title, promotionalPrice, companyId, startAt }: ProductDTO, id: number): Promise<ProductDTO> {
    const result = await this.repository.update({
      where: { id },
      data: {
        title,
        promotionalPrice,
        startAt,
      },
    });
    return result;
  }

  async delete( id: number ): Promise<string> {
    await this.repository.delete({
      where:{
        id,
      }
    })
    const result = "Produto deletado com sucesso!"
    return result;
  }
}
