import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import { ToppingServiceI } from './interface/service.interface';
import { ToppingRequest } from './interface/types';
import { inject } from 'inversify';
import { TYPES } from '../const';

export class ToppingController {
    constructor(@inject(TYPES.ToppingService) private toppingService: ToppingServiceI) {}
    async create(req: ToppingRequest, res: Response, _next: NextFunction) {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            return _next(createHttpError(400, validation.array()[0].msg as string));
        }
        const data = req.body;
        if (!data.tenantId) {
            data.tenantId = req.auth.tenant;
        }
        const image = req.file?.buffer;
        const createTopping = await this.toppingService.create(data, image);
        res.status(200).json(createTopping);
    }
}
