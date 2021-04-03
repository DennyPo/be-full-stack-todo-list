

export const SALT_ROUNDS: number = 10;

export const jwtConstants = {
    accessToken: {
        secret: 'accessSecretKey',
        expiresIn: '60m'
    },
    refreshToken: {
        secret: 'refreshSecretKey',
        expiresIn: '30 days'
    }
};
