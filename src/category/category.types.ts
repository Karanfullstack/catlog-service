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
enum ROLES {
    ADMIN = 'admin',
    MANAGER = 'manager',
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

interface AuthRequest extends Request {
    auth: {
        sub: string;
        role: string;
        id?: string;
    };
}

export {
    Category,
    Attribute,
    PriceConfiguration,
    PriceType,
    WidgetType,
    CreateCategory,
    AuthCookie,
    ROLES,
    AuthRequest,
};
