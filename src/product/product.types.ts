import { PriceType } from '../category/category.types';

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
    attributes: [ProductAttribute];
}

export { Product, PriceType, ProductConfig, ProductAttribute };
