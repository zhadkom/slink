module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '1234',
      database: 'slink',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
}
