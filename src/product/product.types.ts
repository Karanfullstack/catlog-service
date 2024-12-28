import mongoose from 'mongoose';
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
    _id?: string;
    name: string;
    description: string;
    image: string;
    priceConfiguration: {
        [key: string]: ProductConfig;
    };
    attributes: ProductAttribute[];
    tenantId: string;
    categoryId: mongoose.Types.ObjectId;
    isPublish?: boolean;
}

interface CreateProductRequest extends Request {
    body: Omit<Product, 'image'>;
}
interface UpdateProductRequest extends Request {
    body: Omit<Product, 'image'>;
}
interface UpdateProduct {
    _id?: string;
    name: string;
    description: string;
    priceConfiguration: {
        [key: string]: ProductConfig;
    };
    attributes: ProductAttribute[];
    tenantId: string;
    categoryId: mongoose.Types.ObjectId;
    isPublish?: boolean;
}
export {
    Product,
    PriceType,
    ProductConfig,
    ProductAttribute,
    CreateProductRequest,
    UpdateProductRequest,
    UpdateProduct,
};
