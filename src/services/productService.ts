import { Product } from "@prisma/client";
import ProductDTO, { ProductFilter, ProductTitles } from "../shared/models/product";
import { dateTreatment } from "../shared/util";
import { IProductService } from "./interface/productServiceInterface";
import IProductRepository from "../repositories/interfaces/productRepositoryInterface";
import ICompanyRepository from "../repositories/interfaces/companyRepositoryInterface";

export class ProductService implements IProductService {

    private productRepository: IProductRepository;
    private companyRepository: ICompanyRepository;

    constructor(iProductRepository: IProductRepository, ICompanyRepository: ICompanyRepository) {
        this.productRepository = iProductRepository;
        this.companyRepository = ICompanyRepository;
    }

    async findOne(id: number): Promise<ProductDTO | null>{
        const product = await this.productRepository.selectOne({ id });

        if(!product) throw new Error('Produto não encontrado.');

        return product;
    }

    async findProduct({ startAt, endAt, titles, minimumPromotionalPrice, companyId, maximumPromotionalPrice }: ProductFilter): Promise<ProductDTO[]>{
        const products = await this.productRepository.findMany({startAt, endAt, companyId, minimumPromotionalPrice, maximumPromotionalPrice, titles});

        return products;
    }

    async findAllTitles(dateLimit: string): Promise<ProductTitles[]> {
        const endAt = dateTreatment(dateLimit);

        const titles = await this.productRepository.getTitles(endAt);

        return titles;
    };

    async addProduct(data: ProductDTO): Promise<ProductDTO> {
        const {
            companyId,
            title,
            promotionalPrice,
            regularPrice,
            startAt,
            endAt,
            description,
            subTitle,
            imageUrl
        } = data;

        const id = companyId;
        const company = await this.companyRepository.selectOne({ id })

        if (!company) throw new Error('Empresa não encontrada');

        const addProduct = await this.productRepository.create({
            title, 
            regularPrice,
            promotionalPrice, 
            companyId,
            startAt,
            endAt,
            description,
            subTitle,
            imageUrl
        } as Product);
        return addProduct;
    }

    async updateProduct({ title, promotionalPrice, startAt, endAt }: ProductDTO, id: number): Promise<ProductDTO> {
        const productExist = await this.productRepository.selectOne({ id });

        if (!productExist) throw new Error("Produto não encontrado!");

        const updateProduct = await this.productRepository.update({ 
            title, 
            promotionalPrice, 
            startAt, endAt, 
        }, 
        id);
        return updateProduct;
    }

    async deleteProduct( id: number ): Promise<string> {

        const productExist = await this.productRepository.selectOne({ id });

        if (!productExist) throw new Error("Produto não encontrado!");

        const msg = await this.productRepository.delete( id );

        return msg;
    }

}
