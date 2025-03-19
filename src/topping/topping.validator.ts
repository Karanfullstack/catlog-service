import { body, param, query } from 'express-validator';
import mongoose, { isValidObjectId } from 'mongoose';

// create topping
export const toppingValidation = [
    body('name').isString().withMessage('Name must be a string').exists().withMessage('Name cannot be empty'),

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

// delete topping
export const checkingParams = [
    param('id')
        .notEmpty()
        .withMessage('Params must be provided')
        .custom((value) => {
            const mongovalue = mongoose.isValidObjectId(value);
            if (!mongovalue) throw new Error('not a valid id: params:_id');
            return true;
        }),
];

export const checkQueries = [
    query('q').optional().isString().withMessage('q must be a string'),
    query('page').custom((value) => {
        if (value) {
            if (isNaN(Number(value))) {
                return false;
            }
            return true;
        }
    }),
    query('limit').custom((value) => {
        if (value) {
            if (isNaN(Number(value))) {
                return false;
            }
            if (Number(value) > 100) {
                return false;
            }
            return true;
        }
    }),
    query('tenantId')
        .optional()
        .isString()
        .withMessage('tenantId must be a string')
        .custom((value) => {
            if (value) {
                const isNumber = isNaN(Number(value));
                if (isNumber) throw new Error('tenatId must be a valid number');
            }
            return true;
        }),

    query('categoryId')
        .optional()
        .isString()
        .withMessage('categoryId must be a string')
        .custom((value) => {
            if (value) {
                if (!isValidObjectId(value)) {
                    throw new Error('category id must be a valid object ids');
                }
                return true;
            }
        }),
    query('isPublish').optional().isBoolean().withMessage('isPublish must be a boolean'),
];

export const checkUpdate = [
    body('name')
        .optional()
        .custom((value: string) => {
            if (value) {
                if (value.length === 0) throw new Error('name cannot be empty');
                return true;
            }
        }),
    body('price')
        .optional()
        .custom((value) => {
            if (value) {
                const isNumber = isNaN(Number(value));
                if (isNumber) throw new Error('price must be a number');
                if (value < 0) throw new Error('price cannot be negative');
                return true;
            }
        }),
    body('isPublish').optional(),
    body('tenantId')
        .notEmpty()
        .withMessage('Tenant id must be provided')
        .isNumeric()
        .withMessage('tenant id must be a string'),
    body('image')
        .optional()
        .custom((value, { req }) => {
            if (value) {
                const isValidBuffer = (req.file as Express.Multer.File).buffer;
                const validBuffer = Buffer.isBuffer(isValidBuffer);
                if (!validBuffer) throw new Error('image must be a valid buffer');
                return true;
            }
        }),
];
