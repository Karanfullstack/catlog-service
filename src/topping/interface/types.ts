import { ObjectId } from 'mongoose';
import { AuthRequest } from '../../common/types';

export interface Topping {
    _id?: string;
    name: string;
    price: number;
    tenantId?: string | number;
    image?: {
        image: string;
        public_id: string;
    };
    isPublish?: boolean;
    categoryId: ObjectId;
}

export interface ToppingRequest extends AuthRequest {
    body: Topping;
}

export interface ToppingQuery {
    q?: string;
    page?: string;
    limit?: string;
    tenantId?: string;
    categoryId: string;
}

export interface ToppingFilterQuery {
    name?: RegExp;
    tenantId?: string;
    categoryId?: string;
}
