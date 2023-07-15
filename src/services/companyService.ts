import { Company } from "@prisma/client";
import CompanyDTO from "../models/company";
import ICompanyRepository from "../repositories/interfaces/companyRepositoryInterface";
import { ICompanyService } from "./interface/companyServiceInterface";

export class CompanyService implements ICompanyService{
    private companyRepository: ICompanyRepository;

    constructor (iCompanyRepository: ICompanyRepository) {
        this.companyRepository = iCompanyRepository;
    }

    async addCompany(data: CompanyDTO): Promise<CompanyDTO> {
        const { name } = data;

        const addCompany = await this.companyRepository.create({ 
            name,
        } as Company);
        return addCompany;
    }
}