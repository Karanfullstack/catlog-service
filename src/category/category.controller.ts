import { NextFunction, Response } from 'express';
import { CreateCategory } from './category.types';
import { inject, injectable } from 'inversify';
import { TYPES } from '../const';
import { ICategoryService } from './interface/service.interface';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import logger from '../config/logger';

@injectable()
class CategoryController {
    constructor(
        @inject(TYPES.CategoryService) private categoryService: ICategoryService,
    ) {}
    async create(req: CreateCategory, res: Response, next: NextFunction) {
        const { name, priceConfiguration, attributes } = req.body;
        const validation = validationResult(req);

        if (!validation.isEmpty()) {
            const err = createHttpError(400, validation.array()[0].msg as string);
            return next(err);
        }
        logger.info('Requesting Category Data', { ...req.body });
        try {
            const category = await this.categoryService.create({
                name,
                priceConfiguration,
                attributes,
            });
            res.status(201).json({
                success: true,
                data: category,
            });

            logger.info('Created Category', { id: category._id });
        } catch (error) {
            next(error);
        }
    }
}

export { CategoryController };
