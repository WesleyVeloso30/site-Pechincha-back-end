import { Router } from 'express';
import productRouter from './product';
import companyRouter from './company';
import authRouter from './auth';

const routes = Router();

routes.use('/product', productRouter);
routes.use('/company', companyRouter);
routes.use('/auth', authRouter);

export default routes;