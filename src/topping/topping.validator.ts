import { body } from 'express-validator';

export const toppingValidation = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .exists()
        .withMessage('Name cannot be empty'),

    body('price')
        .exists()
        .withMessage('price is required')
        .isNumeric()
        .withMessage('Price must be a number')
        .custom((value) => {
            const notNumber = isNaN(Number(value));
            if (notNumber) {
                throw new Error('price must be a number');
            }
            return true;
        }),
    body('image').custom((image, { req }) => {
        if (!req.file) {
            throw new Error('image is required');
        }
        const isBufferFile = req.file ? (req.file as Express.Multer.File).buffer : null;
        if (isBufferFile && !Buffer.isBuffer(isBufferFile)) {
            throw new Error('Image is not valid as buffer');
        }
        return true;
    }),
    body('tenantId')
        .optional()
        .notEmpty()
        .withMessage('Tenant id must not be empty')
        .custom((value) => {
            const isNumber = isNaN(Number(value));
            if (isNumber) throw new Error('tenatId must be a valid number');
            return true;
        }),
];
