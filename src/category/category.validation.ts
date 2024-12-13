import { body } from 'express-validator';
import { PriceType } from './category.types';

export const categoryValidation = [
    body('name')
        .exists()
        .withMessage('Category is required')
        .isString()
        .withMessage('Category must be a string')
        .notEmpty()
        .withMessage('Name field cannot be emppty'),

    body('priceConfiguration').exists().withMessage('Price configuration is required'),

    body('priceConfiguration.*.priceType')
        .exists()
        .withMessage('Price type is required')
        .custom((value: PriceType) => {
            const priceTypes = Object.values(PriceType);
            if (!priceTypes.includes(value)) {
                throw new Error(
                    `${value} is invalid attribute for priceType field. Possible values are ${priceTypes.join(' or ')}`,
                );
            }
            return true;
        }),
    body('attributes').exists().withMessage('Attributes are required'),
];
