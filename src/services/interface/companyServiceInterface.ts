import CompanyDTO from "../../models/company";

export interface ICompanyService {
    addCompany(data: CompanyDTO): Promise<CompanyDTO>;
}