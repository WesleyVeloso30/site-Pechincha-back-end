import { Router } from 'express';
import productRouter from './product';


const routes = Router();

routes.use('/product', productRouter);

export default routes;