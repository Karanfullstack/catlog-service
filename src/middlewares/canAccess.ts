import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { AuthRequest } from '../category/category.types';

const canAccess = (roles: string[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const authReq = req as AuthRequest;
        console.log(authReq.auth);
        if (!roles.includes(authReq.auth.role)) {
            return next(createHttpError(403, "You dont't have permission to acccess this."));
        }
        return next();
    };
};

export { canAccess };
