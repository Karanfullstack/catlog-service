import { body } from 'express-validator';
import { ProductAttribute, ProductConfig } from './product.types';

const createProductValidator = [
    body('name')
        .exists()
        .withMessage('Product name is required')
        .isString()
        .withMessage('Product name must be a string'),

    body('description')
        .exists()
        .withMessage('Product description is required')
        .isString()
        .withMessage('Product description must be a string'),
    // body('image').custom((value, { req }) => {
    //     if (!req.file) {
    //         throw new Error('Image is required');
    //     }
    //     return true;
    // }),
    body('priceConfiguration').custom((priceConfiguration: string) => {
        const payload = JSON.parse(priceConfiguration) as { [key: string]: ProductConfig };

        const keys = Object.keys(payload);
        console.log(keys);
        if (!keys.length) {
            throw new Error('price configuration must have alteast one key example:"Size, Crust');
        }
        keys.forEach((key) => {
            const config = payload[key];
            if (typeof config !== 'object') {
                throw new Error('price configuration value must be an object');
            }
            if (typeof config.priceType !== 'string') {
                throw new Error('priceType must be a string');
            }
            if (typeof config.avialableOptions !== 'object') {
                throw new Error('availableOptions must be an object');
            }
            Object.entries(config.avialableOptions).forEach(([optionsKey, optionValue]) => {
                if (typeof optionsKey !== 'string') {
                    throw new Error(`${optionsKey as string}.avilableOptions key must string `);
                }

                if (typeof optionValue !== 'number') {
                    throw new Error(`${optionValue as number}.avilableOptions key must number `);
                }
            });
        });
        return true;
    }),
    body('attributes').custom((attributes: string) => {
        const payload = JSON.parse(attributes) as ProductAttribute[];
        if (!Array.isArray(payload)) {
            throw new Error('attributes must be an array');
        }
        return payload.every((attribute) => {
            if (typeof attribute !== 'object') {
                throw new Error('Each attribute must be an object');
            }
            if (typeof attribute.name !== 'string') {
                throw new Error('Each attribute must have a valid name of type string.');
            }
            if (!('value' in attribute)) {
                throw new Error('Each attribute must have a value field.');
            }
            return true;
        });
    }),
    body('attributes.*.name')
        .isString()
        .withMessage('attribute name must be a string')
        .notEmpty()
        .withMessage('attribute name cannot be emppty'),
    body('attributes.*.value')
        .custom((value) => {
            if (
                typeof value !== 'boolean' &&
                typeof value !== 'string' &&
                typeof value !== 'number'
            ) {
                throw new Error('Attribute value must be a boolean, string, or number.');
            }
            return true;
        })
        .withMessage('Invalid value for attribute'),
];

export { createProductValidator };
