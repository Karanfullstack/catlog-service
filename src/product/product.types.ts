import { PriceType } from '../category/category.types';
import { Request } from 'express';
interface ProductConfig {
    priceType: PriceType;
    avialableOptions: {
        [key: string]: number;
    };
}

interface ProductAttribute {
    name: string;
    value: string | number | boolean;
}

interface Product {
    name: string;
    description: string;
    image: string;
    priceConfiguration: {
        [key: string]: ProductConfig;
    };
    attributes: ProductAttribute[];
    tenantId: string;
    caregoryId: string;
    isPublish?: boolean;
}

interface CreateProductRequest extends Request {
    body: Omit<Product, 'image'>;
}

export { Product, PriceType, ProductConfig, ProductAttribute, CreateProductRequest };
