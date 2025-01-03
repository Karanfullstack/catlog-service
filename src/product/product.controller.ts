import { inject } from 'inversify';
import { TYPES } from '../const';
import IProductService from './interfaces/service.interface';
import { CreateProductRequest, ProductAttribute, ProductConfig } from './product.types';
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

        const file = (req.file as Express.Multer.File).buffer;

        if (!Buffer.isBuffer(file)) {
            const err = createHttpError(400, 'Invalid file');
            return next(err);
        }
        let product = req.body;
        console.log(product);
        // @Transform the request data into json
        let priceConfiguration: { [key: string]: ProductConfig } = {};
        let attributes: ProductAttribute[] = [];

        if (typeof product.priceConfiguration === 'string') {
            priceConfiguration = JSON.parse(product.priceConfiguration) as {
                [key: string]: ProductConfig;
            };
        }
        if (typeof product.attributes === 'string') {
            attributes = JSON.parse(product.attributes) as ProductAttribute[];
        }
        product = { ...product, priceConfiguration, attributes };

        console.log(product);

        logger.info({ msg: 'Requesting Create Product', data: product });

        const newProduct = await this.productService.create(product, file);

        logger.info({ msg: 'Created Product Success', data: newProduct });

        res.status(201).json({ message: 'Created', success: true, data: newProduct });
    }
}

export default ProductController;
