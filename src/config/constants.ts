export const SALT_ROUNDS = process.env.SALT_ROUNDS;

export const jwtConstants = {
  accessToken: {
    secret: process.env.ACCESS_TOKEN_SECRET_KEY,
    expiresIn: '24h',
  },
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET_KEY,
    expiresIn: '30 days',
  },
};
