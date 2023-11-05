import ProductDTO from "../../shared/src/models/product";


export interface IProductImageServiceInterface {
    uploadImage(image: Express.Multer.File): Promise<string>;
};
