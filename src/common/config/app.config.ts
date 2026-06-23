export default () => ({
  server: {
    port: Number(process.env.PORT),
    host: process.env.HOST,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },

  database: {
    url: process.env.DATABASE_URL,
  },

  redis: {
    url: process.env.REDIS_URL,
  },

  swagger: {
    user: process.env.SWAGGER_USER,
    password: process.env.SWAGGER_PASSWORD,
  },

  isProduction: process.env.NODE_ENV === 'production',
});
