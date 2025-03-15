import { AggregatePaginateModel, model, Schema } from 'mongoose';
import { Attribute, Category, PriceConfiguration, PriceType, WidgetType } from './category.types';
import paginate from 'mongoose-aggregate-paginate-v2';

const AttributeSchema = new Schema<Attribute>({
    name: {
        type: String,
        required: true,
    },
    widgetType: {
        type: String,
        enum: WidgetType,
        required: true,
    },
    defaulValue: {
        type: Schema.Types.Mixed,
        requried: true,
        default: 'no',
    },
    availableOptions: {
        type: [String],
        required: true,
    },
});

const PriceConfigurationSchema = new Schema<PriceConfiguration>({
    priceType: {
        type: String,
        enum: PriceType,
        required: true,
    },
    availableOptions: {
        type: [String],
        required: true,
    },
});

const CategorySchema = new Schema<Category>({
    name: {
        type: String,
        required: true,
    },
    priceConfiguration: {
        type: Map,
        of: PriceConfigurationSchema,
        required: true,
    },
    attributes: {
        type: [AttributeSchema],
        required: true,
    },
});
CategorySchema.plugin(paginate);
const CategoryModel = model<Category, AggregatePaginateModel<Category>>('Category', CategorySchema);
export default CategoryModel;
