import { Document } from 'mongoose';

enum PriceType {
    BASE = 'base',
    ADDITIONAL = 'additional',
}
enum WidgetType {
    RADIO = 'radio',
    SWITCH = 'switch',
}
interface PriceConfiguration {
    [key: string]: {
        priceType: PriceType;
        availableOptions: string[];
    };
}

interface Attribute extends Document {
    name: string;
    widgetType: WidgetType;
    defaulValue: string | number;
    availableOptions: string[];
}

interface Category extends Document {
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}

export { Category, Attribute, PriceConfiguration, PriceType, WidgetType };
