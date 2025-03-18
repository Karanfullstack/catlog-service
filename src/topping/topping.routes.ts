import { RequestHandler, Router } from 'express';
import { ToppingController } from './topping.controller';
import container from '../config/inversify.config';
import { TYPES } from '../const/index';
import { checkingParams, checkQueries, toppingValidation } from './topping.validator';
import { AsyncWrapper } from '../utils/async-wrapper';
import { upload } from '../middlewares/upload';
import authenticate from '../middlewares/authenticate';
import { canAccess } from '../middlewares/canAccess';
import { ROLES } from '../category/category.types';

const toppingRouter = Router();

const toppingController = container.get<ToppingController>(TYPES.ToppingController);
toppingRouter.post(
    '/',
    authenticate,
    canAccess([ROLES.ADMIN, ROLES.MANAGER]),
    upload.single('image'),
    toppingValidation,
    AsyncWrapper(toppingController.create.bind(toppingController) as RequestHandler),
);

// @Delete topping
toppingRouter.delete(
    '/:id',
    checkingParams,
    AsyncWrapper(toppingController.destroy.bind(toppingController) as RequestHandler),
);

// @Get all toppings
toppingRouter.get(
    '/',
    checkQueries,
    AsyncWrapper(toppingController.getAll.bind(toppingController) as unknown as RequestHandler),
);

export default toppingRouter;
