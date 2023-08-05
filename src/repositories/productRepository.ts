import { Prisma, PrismaClient, Product } from "@prisma/client";
import ProductDTO from "../shared/src/models/product";
import IProductRepository from "./interfaces/productRepositoryInterface";

export class ProductRepository implements IProductRepository {
    private repository = new PrismaClient().product;

  async findMany(data: ProductDTO): Promise<ProductDTO[]> {
    const {
      companyId,
      description,
      endAt,
      imageUrl,
      promotionalPrice,
      regularPrice,
      startAt,
      subTitle,
      title,
    } = data;
    const result = await this.repository.findMany({
      where: {
        startAt,
        endAt,
        title,
        subTitle,
        companyId: companyId,
        promotionalPrice,
        regularPrice,
        description,
        imageUrl,
      },
      include: {
        company: {
          select: {
            name: true,
          }
        }
      }
    })

    return result;
  }

  async create(data: Product): Promise<ProductDTO> {
    const result = await this.repository.create({ data });
    return result;
  }

  async selectOne(where: Prisma.ProductWhereInput): Promise<ProductDTO | null> {
    const result = await this.repository.findFirst({ where });
    return result;
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
