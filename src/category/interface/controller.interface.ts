import { NextFunction, Response } from 'express';
import { CreateCategory } from '../category.types';

interface ICategoryController {
    create(req: CreateCategory, res: Response, next: NextFunction): void;
}

export { ICategoryController };
