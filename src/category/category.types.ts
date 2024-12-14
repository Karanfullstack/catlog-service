import { Request } from 'express';
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

interface Attribute {
    name: string;
    widgetType: WidgetType;
    defaulValue: string | number;
    availableOptions: string[];
}

interface Category {
    _id?: string;
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}

interface CreateCategory extends Request {
    body: Category;
}

interface AuthCookie {
    accessToken: string;
}
export {
    Category,
    Attribute,
    PriceConfiguration,
    PriceType,
    WidgetType,
    CreateCategory,
    AuthCookie,
};
