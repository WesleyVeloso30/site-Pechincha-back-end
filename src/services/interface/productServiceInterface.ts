import ProductDTO, { ProductFilter, ProductTitles } from "../../shared/models/product";

export interface IProductService {
    findOne(id: number): Promise<ProductDTO | null>;
    findProduct({ startAt, endAt, titles, minimumPromotionalPrice, maximumPromotionalPrice, companyId }: ProductFilter): Promise<ProductDTO[]>;
    findAllTitles(dateLimit: string): Promise<ProductTitles[]>;
    addProduct(data: ProductDTO): Promise<ProductDTO>;
    updateProduct({ title, promotionalPrice, startAt, endAt }: ProductDTO, id: number): Promise<ProductDTO>;
    deleteProduct( id: number ): Promise<string>;
};
