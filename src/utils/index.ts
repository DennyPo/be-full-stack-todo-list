import { SALT_ROUNDS } from '../config/constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export const hash = async (password: string): Promise<string> =>
  await bcrypt.hash(password, SALT_ROUNDS);

export const comparePasswords = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => await bcrypt.compare(password, passwordHash);
