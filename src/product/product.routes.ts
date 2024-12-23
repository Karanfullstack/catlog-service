import container from '../config/inversify.config';
import ProductController from './product.controller';
import { TYPES } from '../const';

import { Router } from 'express';
import { AsyncWrapper } from '../utils/async-wrapper';
import { createProductValidator } from './product.validators';

const router = Router();
const productController = container.get<ProductController>(TYPES.ProductController);
router.post(
    '/',
    createProductValidator,
    AsyncWrapper(productController.create.bind(productController)),
);

export { router as productRouter };
