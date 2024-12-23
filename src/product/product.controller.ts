import { inject } from 'inversify';
import { TYPES } from '../const';
import IProductService from './interfaces/service.interface';
import { CreateProductRequest } from './product.types';
import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import logger from '../config/logger';

class ProductController {
    constructor(@inject(TYPES.ProductService) private productService: IProductService) {}
    async create(req: CreateProductRequest, res: Response, next: NextFunction) {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            return next(createHttpError(400, validation.array()[0].msg as string));
        }
        const product = req.body;
        logger.info({ msg: 'Requesting Create Product', data: product });
        const newProduct = await this.productService.create(product);
        logger.info({ msg: 'Created Product Success', data: newProduct });
        res.status(201).json({ message: 'Created', success: true, data: newProduct });
    }
}

export default ProductController;
