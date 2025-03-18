import { NextFunction, Response, Request } from 'express';
import { matchedData, validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import { ToppingServiceI } from './interface/service.interface';
import { ToppingQuery, ToppingRequest } from './interface/types';
import { inject } from 'inversify';
import { TYPES } from '../const';

export class ToppingController {
    constructor(@inject(TYPES.ToppingService) private toppingService: ToppingServiceI) {}

    // @Create Topping
    async create(req: ToppingRequest, res: Response, next: NextFunction) {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            return next(createHttpError(400, validation.array()[0].msg as string));
        }
        const data = req.body;
        // add tenant id if tenand id is invalid or empty string
        if (req.auth.role === 'admin' && data.tenantId === undefined) {
            return next(createHttpError(400, 'Tenant id is required'));
        }
        if (!data.tenantId && data.tenantId === undefined) data.tenantId = req.auth.tenant;

        const image = req.file?.buffer;
        const createTopping = await this.toppingService.create(data, image);
        console.log(createTopping);
        return res.status(200).json(createTopping);
    }

    // @Delete topping
    async destroy(req: ToppingRequest, res: Response, next: NextFunction) {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            return next(createHttpError(400, validation.array()[0].msg as string));
        }
        await this.toppingService.delete(req.params.id);
        return res.status(201).json({ message: 'Ok' });
    }

    // @GetAll toppings
    async getAll(req: Request, res: Response) {
        const queryValidation: ToppingQuery = matchedData(req, { onlyValidData: true });
        const toppings = await this.toppingService.findByAll(queryValidation);
        return res.status(200).json(toppings);
    }
}
