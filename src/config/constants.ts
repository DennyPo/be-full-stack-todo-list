export const SALT_ROUNDS = 10;

export const jwtConstants = {
  accessToken: {
    secret: 'accessSecretKey',
    expiresIn: '24h',
  },
  refreshToken: {
    secret: 'refreshSecretKey',
    expiresIn: '30 days',
  },
};
