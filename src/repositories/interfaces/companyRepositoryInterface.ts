import { Prisma, Company } from "@prisma/client";

export default interface ICompanyRepository {
    create(data: Company): Promise<Company>;
    selectOne(where: Prisma.CompanyWhereInput): Promise<Company | null>;
    findMany(where: Prisma.CompanyWhereInput): Promise<Company[]>;
}