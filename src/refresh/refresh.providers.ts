import { Connection } from 'typeorm';
import { Refresh } from "./entities/refresh.entity";

export const refreshProviders = [
    {
        provide: 'REFRESH_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Refresh),
        inject: ['DATABASE_CONNECTION'],
    },
];
