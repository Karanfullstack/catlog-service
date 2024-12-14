import { expressjwt, GetVerificationKey } from 'express-jwt';
import { Request } from 'express';
import JwksClient from 'jwks-rsa';
import config from 'config';
import { AuthCookie } from '../category/category.types';

export default expressjwt({
    secret: JwksClient.expressJwtSecret({
        jwksUri: config.get('auth.jwks_uri'),
        cache: true,
        rateLimit: true,
    }) as GetVerificationKey,
    algorithms: ['RS256'],
    getToken: (req: Request) => {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.split(' ')[1] !== undefined) {
            const token = authHeader.split(' ')[1];
            if (token) {
                return token;
            }
        }
        const { accessToken } = req.cookies as AuthCookie;
        if (accessToken) {
            return accessToken;
        }
        return undefined;
    },
});