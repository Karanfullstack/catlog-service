import { inject } from 'inversify';
import { TYPES } from '../const';
import IProductService from './interfaces/service.interface';
import {
    CreateProductRequest,
    ProductAttribute,
    ProductConfig,
    UpdateProductRequest,
} from './product.types';
import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import logger from '../config/logger';

class ProductController {
    constructor(@inject(TYPES.ProductService) private productService: IProductService) {}

    // @Create Product
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

        logger.info({ msg: 'Requesting Create Product', data: product });

        const newProduct = await this.productService.create(product, file);

        logger.info({ msg: 'Created Product Success', data: newProduct });

        res.status(201).json({ message: 'Created', success: true, data: newProduct });
    }

    // @Update product
    async update(req: UpdateProductRequest, res: Response, next: NextFunction) {
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            return next(createHttpError(400, validation.array()[0].msg as string));
        }

        const imageBuffer = (req.file as Express.Multer.File)
            ? (req.file as Express.Multer.File).buffer
            : null;

        if (imageBuffer && !Buffer.isBuffer(imageBuffer)) {
            const err = createHttpError(400, 'Invalid file');
            return next(err);
        }
        const productId = req.params.id;
        let product = req.body;
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

        product = { ...product, priceConfiguration, attributes, _id: productId };

        logger.info({ msg: 'Requesting Update Product', data: product });

        const updateProduct = await this.productService.update(product, imageBuffer);

        logger.info({ msg: 'Updated Product Success', data: updateProduct });

        res.status(200).json({ message: 'Updated', success: true, data: updateProduct });
    }
}

export default ProductController;
