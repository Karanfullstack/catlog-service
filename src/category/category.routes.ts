import container from '../config/inversify.config';
import { TYPES } from '../const';
import { categoryValidation } from './category.validation';
import { AsyncWrapper } from '../utils/async-wrapper';
import authenticate from '../middlewares/authenticate';
import { canAccess } from '../middlewares/canAccess';
import { ROLES } from './category.types';
import { Router } from 'express';
import { CategoryController } from './category.controller';

const router = Router();
const categoryController = container.get<CategoryController>(TYPES.CategoryController);

router.post(
    '/',
    authenticate,
    canAccess([ROLES.ADMIN, ROLES.MANAGER]),
    categoryValidation,
    AsyncWrapper(categoryController.create.bind(categoryController)),
);

export { router as categoryRouter };
