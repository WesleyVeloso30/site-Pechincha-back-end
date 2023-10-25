import { Prisma, Product } from "@prisma/client";
import ProductDTO, { ProductTitles } from "../../shared/src/models/product";

export default interface IProductRepository {
    findMany(data: ProductDTO): Promise<ProductDTO[]>;
    create(data: Product): Promise<ProductDTO>;
    selectOne(where: Prisma.ProductWhereInput): Promise<ProductDTO | null>;
    getTitles(endAt: Date): Promise<ProductTitles[]>;
    update({ title, promotionalPrice, companyId, startAt }: ProductDTO, id: number): Promise<ProductDTO>;
    delete( id: number ): Promise<string>;
};
