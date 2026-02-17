import ProductDTO from "../../shared/models/product";


export interface IProductImageServiceInterface {
    uploadImage(image: Express.Multer.File): Promise<string>;
};
