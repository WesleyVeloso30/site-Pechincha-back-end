import { Company, Prisma, PrismaClient } from "@prisma/client";

export class CompanyRepository {
    private repository: Prisma.CompanyDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  > = new PrismaClient().company;

  async selectOne(where: Prisma.CompanyWhereInput): Promise<Company | null> {
    const result = await this.repository.findFirst({ where });
    return result;
  }
}
