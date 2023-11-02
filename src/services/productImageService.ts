// import admin from "firebase-admin";
// import serviceAccount from "../config/firebaseKey.json";
// import { IProductImageServiceInterface } from "./interface/productImageServiceInterface";
// import IProductRepository from "../repositories/interfaces/productRepositoryInterface";

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

//     async uploadImage(image: Express.Multer.File): Promise<string>{

//         let firebaseUrl = "";
//         const fileName =  `${Date.now()}` + "." + image.originalname.split(".").pop();
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

//         return firebaseUrl;
//     }
// }

