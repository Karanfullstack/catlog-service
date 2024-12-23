import { body } from 'express-validator';

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
    body('image')
        .exists()
        .withMessage('Product image is required')
        .isString()
        .withMessage('Product image must be a string'),
    body('priceConfiguration').exists().withMessage('Product priceConfiguration is required'),
    body('attributes').exists().withMessage('Product attributes is required'),
];

export { createProductValidator };
