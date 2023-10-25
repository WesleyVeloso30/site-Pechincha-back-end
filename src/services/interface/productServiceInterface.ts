import ProductDTO, { ProductTitles } from "../../shared/src/models/product";

export interface IProductService {
    findOne(id: number): Promise<ProductDTO | null>;
    findProduct({ startAt, endAt, title, promotionalPrice, companyId }: ProductDTO): Promise<ProductDTO[]>;
    findAllTitles(dateLimit: string): Promise<ProductTitles[]>;
    addProduct(data: ProductDTO): Promise<ProductDTO>;
    updateProduct({ title, promotionalPrice, startAt, endAt }: ProductDTO, id: number): Promise<ProductDTO>;
    deleteProduct( id: number ): Promise<string>;
};
