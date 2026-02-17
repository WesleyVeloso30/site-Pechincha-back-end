import CompanyDTO from "../../shared/models/company";

export interface ICompanyService {
    addCompany(data: CompanyDTO): Promise<CompanyDTO>;
    getCompany(data: CompanyDTO): Promise<CompanyDTO[]>;
};
