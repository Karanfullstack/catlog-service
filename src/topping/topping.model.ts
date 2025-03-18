import mongoose, { AggregatePaginateModel, Document, Schema } from 'mongoose';
import { Topping } from './interface/types';
import paginate from 'mongoose-aggregate-paginate-v2';

interface ToppingDocument extends Omit<Topping, '_id'>, Document {}
const ToppingSchema: Schema = new mongoose.Schema<Topping>({
    name: {
        type: String,
        required: [true, 'Topping name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Topping price is required'],
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

ToppingSchema.plugin(paginate);

const ToppingModel = mongoose.model<ToppingDocument, AggregatePaginateModel<Topping>>(
    'Topping',
    ToppingSchema,
);

export default ToppingModel;
