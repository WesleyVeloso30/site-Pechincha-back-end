import { Router, Request, Response } from "express";
import ProductDTO from "../shared/src/models/product";
import { ProductService } from "../services/productService";
import { verifyIfNotANumber, verifyIfPastDate } from "../util";

const productRoute = Router();
const productService = new ProductService();

productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const { date, title, price, companyId } = req.query;

    let dateConvertido: Date | null = null;
    if (date) {
      const stringDate = String(date);
      const smashDate = stringDate.split("-");

      const day = Number(smashDate[2]);
      const month = Number(smashDate[1]);
      const year = Number(smashDate[0]);

      if (day > 31 || month > 12) throw new Error("Informe uma data válida.");

      dateConvertido = new Date(`${year}/${month}/${day}`);
    }

    const products = await productService.findProduct({
      ...(dateConvertido && { date: dateConvertido }),
      ...(title && { title: title as string }),
      ...(price && { price: Number(price) }),
      ...(companyId && { id: companyId as string }),
    });

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
      !promotionalPrice ||
      !imageUrl
    ) {
      throw new Error("Algum campo inválido");
    }

    // conversão dos dados para o tipo correto
    regularPrice = verifyIfNotANumber(regularPrice);
    promotionalPrice = verifyIfNotANumber(promotionalPrice);
    // conversão e tratamento para startAt e endAt
    const startDateAndHour = startAt.split("T");
    const endDateAndHour = startAt.split("T");

    const startHour = startDateAndHour[1];
    const endHour = endDateAndHour[1];

    //Date
    const smashStartAt = startDateAndHour[0].split("-");
    const smashEndAt = endDateAndHour[0].split("-");

    const startAtDay = smashStartAt[2];
    const startAtMonth = smashStartAt[1];
    const startAtYear = smashStartAt[0];
    const endAtDay = smashEndAt[2];
    const endAtMonth = smashEndAt[1];
    const endAtYear = smashEndAt[0];

    verifyIfNotANumber(startAtDay);
    verifyIfNotANumber(startAtMonth);
    verifyIfNotANumber(endAtDay);
    verifyIfNotANumber(endAtMonth);

    if (startAtDay > 31 || startAtMonth > 12) throw new Error("Informe uma data válida.");
    verifyIfPastDate(startAtDay, startAtMonth, startAtYear);
    if (endAtDay > 31 || endAtMonth > 12) throw new Error("Informe uma data válida.");
    verifyIfPastDate(endAtDay, endAtMonth, endAtYear);

    const startAtConverted = new Date(`${startAtYear}/${startAtMonth}/${startAtDay}T${startHour}`);
    const endAtConverted = new Date(`${endAtYear}/${endAtMonth}/${endAtDay}T${endHour}`);    

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
