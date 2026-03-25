export const envs = {
  secretJwt: process.env.SECRET_JWT || '',
  port: Number(process.env.PORT) || 3000,
  hostname: process.env.HOSTNAME ?? 'localhost',
  baseUrl: process.env.API_BASE_URL ?? '/api',
  docsUrl: process.env.DOCS_URL ?? '/public/api-docs',
  openApiUrl: process.env.OPENAPI_URL ?? '/public/openapi.json',
  mongo: {
    connectionString: process.env.DB_MONGO_CONNECTION_STRING ?? '',
  },
};
