import container from '../config/inversify.config';
import ProductController from './product.controller';
import { TYPES } from '../const';

import { Router } from 'express';
import { AsyncWrapper } from '../utils/async-wrapper';
import { createProductValidator } from './product.validators';
import { upload } from '../middlewares/upload';

const router = Router();
const productController = container.get<ProductController>(TYPES.ProductController);
router.post(
    '/',
    upload.single('image'),
    createProductValidator,
    AsyncWrapper(productController.create.bind(productController)),
);

router.put(
    '/:id',
    upload.single('image'),
    createProductValidator,
    AsyncWrapper(productController.update.bind(productController)),
);

export { router as productRouter };
