module.exports = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'admin',
  password: '111',
  database: 'mydb',
  synchronize: true,
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
};
