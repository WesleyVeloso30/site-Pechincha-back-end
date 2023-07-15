import { Product } from "@prisma/client";
import ProductDTO from "../models/product";
import { CompanyRepository } from "../repositories/companyRepository";
import { ProductRepository } from "../repositories/productRepository";

const productRepository = new ProductRepository;
const companyRepository = new CompanyRepository;

export class ProductService {

    async findProduct({ date, name, price, companyId }: ProductDTO): Promise<ProductDTO[]>{
        const products = await productRepository.findMany({date, companyId, price, name});

        return products;
    }

    async addProduct({ companyId, name, price, date }: ProductDTO): Promise<ProductDTO> {

        const id = companyId;
        const company = await companyRepository.selectOne({ id })

        if (!company) throw new Error('Empresa não encontrada');

        const addProduct = await productRepository.create({ 
            name, 
            price, 
            id,
            date,
        } as Product);
        return addProduct;
    }

    async updateProduct({ name, price, date }: ProductDTO, id: number): Promise<ProductDTO> {
        const productExist = await productRepository.selectOne({ id });

        if (!productExist) throw new Error("Produto não encontrado!");

        const updateProduct = await productRepository.update({ 
            name, 
            price, 
            date, 
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
