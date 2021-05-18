module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
};
