import { Router } from 'express';
import container from '../config/inversify.config';
import { TYPES } from '../const';
import { ICategoryController } from './interface/controller.interface';
import { categoryValidation } from './category.validation';
import { AsyncWrapper } from '../utils/async-wrapper';

const router = Router();
const categoryController = container.get<ICategoryController>(TYPES.CategoryController);

router.post(
    '/',
    categoryValidation,
    AsyncWrapper(categoryController.create.bind(categoryController)),
);

export { router as categoryRouter };
