import { Router } from 'express';
import productRouter from './product';
import companyRouter from './company';


const routes = Router();

routes.use('/product', productRouter);
routes.use('/company', companyRouter);

export default routes;