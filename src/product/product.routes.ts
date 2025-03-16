import container from '../config/inversify.config';
import ProductController from './product.controller';
import { TYPES } from '../const';
import { Router } from 'express';
import { AsyncWrapper } from '../utils/async-wrapper';
import { createProductValidator, updateProductValidator } from './product.validators';
import { upload } from '../middlewares/upload';
import authenticate from '../middlewares/authenticate';
import { canAccess } from '../middlewares/canAccess';
import { ROLES } from '../category/category.types';
import productAccess from '../middlewares/productAccess';
import { queryValidator } from './query.validator';

const router = Router();
const productController = container.get<ProductController>(TYPES.ProductController);
router.post(
    '/',
    authenticate,
    canAccess([ROLES.ADMIN, ROLES.MANAGER]),
    upload.single('image'),
    createProductValidator,
    AsyncWrapper(productController.create.bind(productController)),
);

router.put(
    '/:id',
    authenticate,
    canAccess([ROLES.ADMIN, ROLES.MANAGER]),
    productAccess,
    upload.single('image'),
    updateProductValidator,
    AsyncWrapper(productController.update.bind(productController)),
);

router.get(
    '/',
    queryValidator,
    AsyncWrapper(productController.getProducts.bind(productController)),
);

export { router as productRouter };
