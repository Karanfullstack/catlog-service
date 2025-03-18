import mongoose, { AggregatePaginateModel, model, Schema } from 'mongoose';
import { PriceType, Product, ProductAttribute, ProductConfig } from './product.types';
import paginate from 'mongoose-aggregate-paginate-v2';
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
        image: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        },
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
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
});
ProductSchema.plugin(paginate);
const ProductModel = model<Product, AggregatePaginateModel<Product>>('Product', ProductSchema);

export default ProductModel;
