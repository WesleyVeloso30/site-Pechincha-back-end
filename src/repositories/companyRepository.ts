import { Company, Prisma, PrismaClient } from "@prisma/client";
import ICompanyRepository from "./interfaces/companyRepositoryInterface";

export class CompanyRepository implements ICompanyRepository {
    private repository = new PrismaClient().company;

  async selectOne(where: Prisma.CompanyWhereInput): Promise<Company | null> {
    const result = await this.repository.findFirst({ where });
    return result;
  }

  async create(data: Company): Promise<Company> {
    const result = await this.repository.create({ data });
    return result;
  }

  async findMany(where: Prisma.CompanyWhereInput): Promise<Company[]> {
    const result = await this.repository.findMany({where});
    return result;
  }
}
