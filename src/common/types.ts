import { Request } from 'express';
import mongoose from 'mongoose';

export interface IQuery {
    q?: string;
    page?: number;
    limit?: number;
    categoryId?: mongoose.Types.ObjectId;
    tenantId?: string;
    isPublish?: string | boolean;
}

interface AuthRequest extends Request {
    auth: {
        id?: string;
        sub: string;
        role: string;
        jti: string;
        email: string;
        firstName: string;
        lastName: string;
        tenant: string;
    };
}

export { AuthRequest };
