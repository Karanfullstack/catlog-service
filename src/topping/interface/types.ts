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
}

export interface ToppingRequest extends AuthRequest {
    body: Topping;
}
