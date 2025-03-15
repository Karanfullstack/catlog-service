import { query } from 'express-validator';

export const queryValidator = [
    query('q').optional().isString().withMessage('q must be a string'),
    query('tenantId').optional().isString().withMessage('tenantId must be a string'),
    query('categoryId').optional().isString().withMessage('categoryId must be a string'),
    query('isPublish').optional().isBoolean().withMessage('isPublish must be a boolean'),
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
];
