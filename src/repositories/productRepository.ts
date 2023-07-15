import { Prisma, PrismaClient, Product } from "@prisma/client";
import ProductDTO from "../models/product";
import IProductRepository from "./interfaces/productRepositoryInterface";

export class ProductRepository implements IProductRepository {
    private repository = new PrismaClient().product;

  async findMany(data: ProductDTO): Promise<ProductDTO[]> {
    const result = await this.repository.findMany({
      where: {
        date: data.date,
        name: data.name,
        id: data.companyId,
        price: data.price,
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

  async update({  name, price, companyId, date }: ProductDTO, id: number): Promise<ProductDTO> {
    const result = await this.repository.update({
      where: { id },
      data: {
        name,
        price,
        date,
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
