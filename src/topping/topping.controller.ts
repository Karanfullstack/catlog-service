import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import { ToppingServiceI } from './interface/service.interface';
import { ToppingRequest } from './interface/types';
import { inject } from 'inversify';
import { TYPES } from '../const';

export class ToppingController {
    constructor(@inject(TYPES.ToppingService) private toppingService: ToppingServiceI) {}
    async create(req: ToppingRequest, res: Response, next: NextFunction) {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            return next(createHttpError(400, validation.array()[0].msg as string));
        }
        const data = req.body;
        console.log(req.auth);
        // add tenant id if tenand id is invalid or empty string
        if (req.auth.role === 'admin' && data.tenantId === undefined) {
            return next(createHttpError(400, 'Tenant id is required'));
        }
        if (!data.tenantId && data.tenantId === undefined) data.tenantId = req.auth.tenant;

        const image = req.file?.buffer;
        const createTopping = await this.toppingService.create(data, image);
        console.log(createTopping);
        res.status(200).json(createTopping);
    }
}
