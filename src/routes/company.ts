import { Router, Request, Response } from "express";
import CompanyDTO from "../models/company";
import { CompanyService } from "../services/companyService";
import { CompanyRepository } from "../repositories/companyRepository";
import ICompanyRepository from "../repositories/interfaces/companyRepositoryInterface";
import { ICompanyService } from "../services/interface/companyServiceInterface";

const companyRoute = Router();
const companyRepository: ICompanyRepository = new CompanyRepository();
const companyService: ICompanyService = new CompanyService(companyRepository);

companyRoute.post("/", async (req: Request, res: Response) => {
    try {
      let { name } = req.body;
  
      if (
        !name
      ) {
        throw new Error("Algum campo inválido");
      }

      const Company = await companyService.addCompany({
        name
      } as CompanyDTO);

      return res.status(201).json(Company);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
});

export default companyRoute;