import { model, Schema } from 'mongoose';
import { PriceType, Product, ProductAttribute, ProductConfig } from './product.types';

const ProductAttributesSchema = new Schema<ProductAttribute>({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});

const ProductConfigSchema = new Schema<ProductConfig>({
    priceType: {
        type: String,
        enum: Object.values(PriceType),
    },
    avialableOptions: {
        type: Map,
        of: Number,
    },
});

const ProductSchema = new Schema<Product>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    priceConfiguration: {
        type: Map,
        of: ProductConfigSchema,
    },
    attributes: [ProductAttributesSchema],
    isPublish: {
        type: Boolean,
        default: false,
    },
    tenantId: {
        type: String,
        required: true,
    },
    caregoryId: {
        type: String,
        required: true,
    },
});

const ProductModel = model<Product>('Product', ProductSchema);

export default ProductModel;
