import { RequestHandler, Request, Response, NextFunction } from 'express';

const AsyncWrapper = (requestHandler: RequestHandler): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => {
            return next(error);
        });
    };
};

export { AsyncWrapper };
