import { SALT_ROUNDS } from "../config/constants";

const bcrypt = require('bcrypt');

export const hash = async (password: string): Promise<string> => await bcrypt.hash(password, SALT_ROUNDS);

export const comparePasswords = async (password: string, passwordHash: string): Promise<boolean> =>
    await bcrypt.compare(password, passwordHash);

