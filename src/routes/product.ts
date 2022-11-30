import { Router, Request, Response } from "express";
import ProductDTO from "../models/product";
import { ProductService } from "../services/productService";

const productRoute = Router();
const productService = new ProductService();

productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const products = await productService.findALLProduct();

    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

productRoute.get("/filter", async (req: Request, res: Response) => {
  try {
    const { date, name, price, companyId } = req.query;

    if (!date && !name && !price && !companyId)
      throw new Error("Nenhum filtro informado.");

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

    const products = await productService.findProductByFilter({
      ...(dateConvertido && { date: dateConvertido }),
      ...(name && { name: name as string }),
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
    let { companyId, date, price, name } = req.body;

    if (
      !companyId ||
      !date ||
      !name ||
      !price
    ) {
      throw new Error("Algum campo inválido");
    }

    price = Number(price);
    const smashDate = date.split("-");

    const day = smashDate[2];
    const month = smashDate[1];
    const year = smashDate[0];

    Number(day);
    Number(month);

    if (day > 31 || month > 12) throw new Error("Informe uma data válida.");

    const dateConvertido = new Date(`${year}/${month}/${day}`);

    const product = await productService.addProduct({
      price,
      date: dateConvertido,
      companyId,
      name,
    } as ProductDTO);

    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
});

productRoute.put("/:id", async (req: Request, res: Response) => {
  try {
    let { price, name, date } = req.body;
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
        name,
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
