import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { AuthRequest } from '../common/types';

const canAccess = (roles: string[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const authReq = req as AuthRequest;
        if (!roles.includes(authReq.auth.role)) {
            return next(createHttpError(403, "You dont't have permission to acccess this."));
        }
        return next();
    };
};

export { canAccess };
