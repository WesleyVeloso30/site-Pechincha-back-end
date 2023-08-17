import { Company } from "@prisma/client";
import CompanyDTO from "../shared/src/models/company";
import ICompanyRepository from "../repositories/interfaces/companyRepositoryInterface";
import { ICompanyService } from "./interface/companyServiceInterface";

export class CompanyService implements ICompanyService{
    private companyRepository: ICompanyRepository;

    constructor (iCompanyRepository: ICompanyRepository) {
        this.companyRepository = iCompanyRepository;
    }

    async addCompany(data: CompanyDTO): Promise<CompanyDTO> {
        const { name } = data;

        const companyExist = await this.companyRepository.selectOne({ name });

        if (companyExist) throw new Error('Empresa já existe.');

        const addCompany = await this.companyRepository.create({ 
            name,
        } as Company);
        return addCompany;
    }

    async getCompany(data: CompanyDTO): Promise<CompanyDTO[]> {
        const companys = await this.companyRepository.findMany(data);
        return companys;
    }
}