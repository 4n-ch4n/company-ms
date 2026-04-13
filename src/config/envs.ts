export const envs = {
  secretJwt: process.env.JWT_SECRET || '',
  port: Number(process.env.PORT) || 3000,
  hostname: process.env.HOSTNAME ?? 'localhost',
  baseUrl: process.env.API_BASE_URL ?? '/api',
  docsUrl: process.env.DOCS_URL ?? '/public/api-docs',
  openApiUrl: process.env.OPENAPI_URL ?? '/public/openapi.json',
  mongo: {
    connectionString: process.env.DB_MONGO_CONNECTION_STRING ?? '',
  },
  services: {
    securityMS: process.env.SECURITY_MS_URL ?? 'http://localhost:3001',
    subscriptionMS: process.env.SUBSCRIPTION_MS_URL ?? 'http://localhost:3002',
  }
};
