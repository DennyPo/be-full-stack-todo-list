export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

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
