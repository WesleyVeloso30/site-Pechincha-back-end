import { Product } from "@prisma/client";
import ProductDTO from "../shared/src/models/product";
import { CompanyRepository } from "../repositories/companyRepository";
import { ProductRepository } from "../repositories/productRepository";
import { dateTreatment } from "../shared/src/util";

const productRepository = new ProductRepository;
const companyRepository = new CompanyRepository;

export class ProductService {

    async findOne(id: number): Promise<ProductDTO | null>{
        const product = await productRepository.selectOne({ id });

        if(!product) throw new Error('Produto não encontrado.');

        return product;
    }

    async findProduct({ startAt, endAt, title, promotionalPrice, companyId }: ProductDTO): Promise<ProductDTO[]>{
        const products = await productRepository.findMany({startAt, endAt, companyId, promotionalPrice, title});

        return products;
    }

    async findAllTitles(dateLimit: string): Promise<{title: string | null}[]> {
        const endAt = dateTreatment(dateLimit);

        const titles = await productRepository.getTitles(endAt);

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
        const company = await companyRepository.selectOne({ id })

        if (!company) throw new Error('Empresa não encontrada');

        const addProduct = await productRepository.create({
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
        const productExist = await productRepository.selectOne({ id });

        if (!productExist) throw new Error("Produto não encontrado!");

        const updateProduct = await productRepository.update({ 
            title, 
            promotionalPrice, 
            startAt, endAt, 
        }, 
        id);
        return updateProduct;
    }

    async deleteProduct( id: number ): Promise<string> {

        const productExist = await productRepository.selectOne({ id });

        if (!productExist) throw new Error("Produto não encontrado!");

        const msg = await productRepository.delete( id );

        return msg;
    }

}
