import { PrismaClient, Prisma } from "@prisma/client";
import IUserRepository from "./interfaces/userRepositoryInterface";

export class UserRepository implements IUserRepository {
  private repository = new PrismaClient().user;

  async create(data: Prisma.UserCreateInput) {
    return this.repository.create({ data });
  }

  async findByEmail(email: string) {
    return this.repository.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.repository.findUnique({ where: { id } });
  }
}
