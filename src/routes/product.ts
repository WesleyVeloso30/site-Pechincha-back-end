import { Router, Request, Response } from "express";
import ProductDTO from "../shared/src/models/product";
import { ProductService } from "../services/productService";
import { dateTreatment, verifyIfNotANumber, verifyIfPastDate } from "../shared/src/util";

const productRoute = Router();
const productService = new ProductService();

productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const { startAt, endAt, title, promotionalPrice, companyId } = req.query;

    let endAtConverted: Date | null = null;
    if (endAt) {
      endAtConverted = dateTreatment(endAt as string);
    }
    
    let startAtConverted: Date | null = null;
    if (startAt) {
      startAtConverted = dateTreatment(startAt as string);
    }
    
    if (startAtConverted && endAtConverted) {
      if (endAtConverted <= startAtConverted) throw new Error("A data inicial não pode ser maior do que a data final da promoção.");
    }

    let promotionalPriceConverted: number | null = null;
    if(promotionalPrice) {
      promotionalPriceConverted = verifyIfNotANumber(promotionalPrice as string);
    }
    
    let companyIdConverted: number | undefined = undefined;
    if(companyId) {
      companyIdConverted = verifyIfNotANumber(companyId as string);
    }

    const products = await productService.findProduct({
      ...(endAtConverted && { endAt: endAtConverted }),
      ...(startAtConverted && { startAt: startAtConverted }),
      ...(title && { title: title as string }),
      ...(promotionalPrice && { promotionalPrice: promotionalPriceConverted }),
      ...(companyId && { companyId: companyIdConverted }),
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
    console.log(req.params.id as unknown as string);
    const id = verifyIfNotANumber(req.params.id as unknown as string);

    const products = await productService.findOne(id);

    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});


productRoute.post("/", async (req: Request, res: Response) => {
  try {
    let {
      companyId,
      startAt,
      endAt,
      regularPrice,
      promotionalPrice,
      title,
      subTitle,
      imageUrl,
      description
    } = req.body;

    // verificação se falta algum campo obrigatório
    if (
      !companyId ||
      !startAt ||
      !endAt ||
      !title ||
      !promotionalPrice
      // !imageUrl
    ) {
      throw new Error("Algum campo inválido");
    }

    // conversão dos dados para o tipo correto
    regularPrice = verifyIfNotANumber(regularPrice);
    promotionalPrice = verifyIfNotANumber(promotionalPrice);

    // conversão e tratamento para startAt e endAt
    const startAtConverted = dateTreatment(startAt);
    const endAtConverted = dateTreatment(endAt);

    verifyIfPastDate(startAtConverted);
    verifyIfPastDate(endAtConverted);

    if (endAtConverted <= startAtConverted) throw new Error("A data inicial não pode ser maior do que a data final da promoção.");

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
