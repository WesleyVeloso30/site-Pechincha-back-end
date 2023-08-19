import { Router, Request, Response } from 'express';

const addressRoute = Router();

addressRoute.post('/', async (req: Request, res: Response) => {
    const { companyId, street, district, city, state, referencePoint, number, zipCode } = req.body

});

addressRoute.get('/', async (req: Request, res: Response) => {

});
