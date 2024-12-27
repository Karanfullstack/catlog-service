import { NextFunction, Request, Response } from 'express';
import { AsyncWrapper } from '../utils/async-wrapper';
import ProductModel from '../product/product.model';
import createHttpError from 'http-errors';
import { AuthRequest } from '../common/types';

export default AsyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const auth = (req as AuthRequest).auth;
    const tenantId = auth.tenant;
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
        const err = createHttpError(404, 'Product not found');
        return next(err);
    }

    if (auth.role !== 'admin') {
        if (product.tenantId !== tenantId) {
            const err = createHttpError(403, 'Forbidden - Only product owner can access.');
            return next(err);
        }
    }
    return next();
});
