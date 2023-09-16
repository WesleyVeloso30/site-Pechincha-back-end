// import admin from "firebase-admin";
// import serviceAccount from "../config/firebaseKey.json";
// import IUserImageServiceInterface from "./interfaces/userImageServiceInterface";
// import UserDTO, { FirebaseUrl } from "../models/user";
// import { IUserRepository } from "../repositories/interfaces/userRepositoryInterface";

// const bucketAddress = "pechincha-image-product.appspot.com";
// const private_key_id = process.env.PRIVATE_KEY_ID!;
// const private_key = process.env.PRIVATE_KEY!;

// serviceAccount.private_key = private_key.replace(
//     /\\n/g,
//     "\n",
// );
// serviceAccount.private_key_id = private_key_id;

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//     storageBucket: bucketAddress,
// });

// const bucket = admin.storage().bucket();

// export class ProductImageService implements IProductImageServiceInterface {
//     private ProductRepository: IProductRepository;

//     constructor( iProductRepository: IProductRepository) {
//         this.productRepository = iProductRepository;
//     }

//     async uploadImage(image: Express.Multer.File , id: string): Promise<FirebaseUrl>{

//         const Product = await this.verifyProductExist(Number(id));
//         this.productActive(Product);

//         let firebaseUrl = "";
//         const fileName =  `${Date.now()}=`+ id + "." + image.originalname.split(".").pop();
//         const file = bucket.file("Product/" + fileName);
//         const stream = file.createWriteStream({
//             metadata: {
//                 contentType: image.mimetype,
//             },
//         });
        
//         stream.on("error", (error: any) => {
//             throw new Error(error);
//         })

//         stream.end(image.buffer);

//         await file.save(image.buffer);

//         //tornar o arquivo publico
//         await file.makePublic();

//         // obter a url publica
//         firebaseUrl = file.publicUrl();
        

//         const FirebaseUrl = await this.ProductRepository.updateImage(firebaseUrl, Number(id));

//         return FirebaseUrl;
//     }

//     async verifyProductExist(id: number): Promise<ProductDTO> {
//         const ProductExists = await this.ProductRepository.selectOne({ id });

//         if(!ProductExists) throw new Error("Usuário não encontrado.");

//         return ProductExists;
//     }

    
//     productActive(product: ProductDTO): boolean {
//         if(!product.active) throw new Error("Usuário inativo.");
//         return product.active;
//     }
// }

