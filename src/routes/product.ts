import { Router, Request, Response } from "express";
import ProductDTO from "../shared/src/models/product";
import { ProductService } from "../services/productService";
import { dateTreatment, verifyIfNotANumber, verifyIfPastDate } from "../shared/src/util";
import { ProductRepository } from "../repositories/productRepository";
import IProductRepository from "../repositories/interfaces/productRepositoryInterface";
import ICompanyRepository from "../repositories/interfaces/companyRepositoryInterface";
import { CompanyRepository } from "../repositories/companyRepository";
import { ProductImageService } from "../services/productImageService";
import { IProductImageServiceInterface } from "../services/interface/productImageServiceInterface";
import Multer from "multer";

const multer = Multer({
  storage: Multer.memoryStorage(),
});

const productRoute = Router();
const productRepository: IProductRepository = new ProductRepository();
const companyRepository: ICompanyRepository = new CompanyRepository();
const productService = new ProductService(productRepository, companyRepository);
const productImageService: IProductImageServiceInterface = new ProductImageService();

productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const { startAt, endAt, maximumPromotionalPrice, companyId, minimumPromotionalPrice} = req.query;

    let titles = null;
    if (req.query.titles !== '') {
      titles = Array.isArray(req.query.titles) ? req.query.titles : [req.query.titles];
    }

    if (req.query.titles === '') titles = undefined; 

    const endAtConverted = endAt && dateTreatment(endAt as string);
    const startAtConverted = startAt && dateTreatment(startAt as string);

    if (startAtConverted && endAtConverted) {
      if (endAtConverted <= startAtConverted) throw new Error("A data inicial não pode ser maior do que a data final da promoção.");
    }

    const minimumPromotionalPriceConverted = minimumPromotionalPrice&& verifyIfNotANumber(minimumPromotionalPrice as string);
    const maximumPromotionalPriceConverted = maximumPromotionalPrice && verifyIfNotANumber(maximumPromotionalPrice as string);
    
    if (minimumPromotionalPriceConverted && maximumPromotionalPriceConverted) {
      if (maximumPromotionalPriceConverted < minimumPromotionalPriceConverted) throw new Error("O preço mínimo não pode ser maior do que o preço máximo da promoção.");
    }
    
    const companyIdConverted = companyId && verifyIfNotANumber(companyId as string);

    const products = await productService.findProduct({
      ...(endAtConverted && { endAt: endAtConverted }),
      ...(startAtConverted && { startAt: startAtConverted }),
      ...(titles && { titles: titles as string[] }),
      ...(minimumPromotionalPriceConverted && { minimumPromotionalPrice: minimumPromotionalPriceConverted }),
      ...(maximumPromotionalPriceConverted && { maximumPromotionalPrice: maximumPromotionalPriceConverted }),
      ...(companyIdConverted && { companyId: companyIdConverted }),
    });

    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

productRoute.get("/titles", async (req: Request, res: Response) => {
  try {
    const dateLimit = req.query.dateLimit as unknown as string;

    const products = await productService.findAllTitles(dateLimit);

    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

productRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = verifyIfNotANumber(req.params.id as unknown as string);

    const products = await productService.findOne(id);  

    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

  // multer.single("image"),
productRoute.post("/", multer.single("Image"), async (req: Request, res: Response) => {
  try {
    const Image = req.file;

    let {
      companyId,
      startAt,
      endAt,
      regularPrice,
      promotionalPrice,
      title,
      subTitle,
      description
    } = req.body;

    // verificação se falta algum campo obrigatório
    if (
      !companyId ||
      !startAt ||
      !endAt ||
      !title ||
      !promotionalPrice ||
      !Image
    ) {
      throw new Error("Algum campo inválido");
    }

    // conversão dos dados para o tipo correto
    regularPrice = verifyIfNotANumber(regularPrice);
    promotionalPrice = verifyIfNotANumber(promotionalPrice);
    companyId = verifyIfNotANumber(companyId);

    // conversão e tratamento para startAt e endAt
    const startAtConverted = dateTreatment(startAt);
    const endAtConverted = dateTreatment(endAt);

    verifyIfPastDate(startAtConverted);
    verifyIfPastDate(endAtConverted);

    if (endAtConverted <= startAtConverted) throw new Error("A data inicial não pode ser maior do que a data final da promoção.");

    const imageUrl = await productImageService.uploadImage(Image).catch((err) => {
      throw new Error(`Ocorreu um erro ao realizar o upload da imagem: ${err}`)
    });

    // seguindo para o service...
    const product = await productService.addProduct({
      regularPrice,
      promotionalPrice,
      startAt: startAtConverted,
      endAt: endAtConverted,
      companyId,
      title,
      subTitle,
      imageUrl,
      description
    } as ProductDTO);

    //enviando resposta
    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

productRoute.put("/:id", async (req: Request, res: Response) => {
  try {
    let { price, title, date } = req.body;
    const { id } = req.params;

    let dateConvertido: Date | null = null;
    if (date) {
      const smashDate = date.split("-");

      const day = smashDate[2];
      const month = smashDate[1];
      const year = smashDate[0];

      Number(day);
      Number(month);

      if (day > 31 || month > 12) throw new Error("Informe uma data válida.");

      dateConvertido = new Date(`${year}/${month}/${day}`);
    }

    price = Number(price);

    const product = await productService.updateProduct(
      {
        date: dateConvertido,
        price,
        title,
      } as ProductDTO,
      Number(id)
    );

    return res.status(200).json(product);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

productRoute.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const msg: string = await productService.deleteProduct(Number(id));

    return res.status(200).json(msg);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

export default productRoute;
