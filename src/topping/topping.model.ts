import mongoose, { AggregatePaginateModel } from 'mongoose';
import { Topping } from './interface/types';
import paginate from 'mongoose-aggregate-paginate-v2';

const ToppingSchema = new mongoose.Schema<Topping>({
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
});

ToppingSchema.plugin(paginate);

const ToppingModel = mongoose.model<Topping, AggregatePaginateModel<Topping>>(
    'Topping',
    ToppingSchema,
);

export default ToppingModel;
