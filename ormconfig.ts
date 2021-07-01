module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || '111',
  database: process.env.DB_NAME || 'mydb',
  synchronize: false,
  migrations: ['migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migration',
  },
};
