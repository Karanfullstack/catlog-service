import { body } from 'express-validator';

export const categoryValidation = [
    body('name')
        .exists()
        .withMessage('Category is required')
        .isString()
        .withMessage('Category must be a string'),
    body('priceConfiguration').exists().withMessage('Price configuration is required'),
    body('priceConfiguration.*.priceType')
        .exists()
        .withMessage('Price type is required')
        .custom((value: 'additional' | 'base') => {
            const priceTypes = ['additional', 'base'];
            if (!priceTypes.includes(value)) {
                throw new Error(
                    `${value} is invalid attribute for priceType field. Possible values are ${priceTypes.join(', ')}`,
                );
            }
            return true;
        }),
    body('attributes').exists().withMessage('Attributes are required'),
];
