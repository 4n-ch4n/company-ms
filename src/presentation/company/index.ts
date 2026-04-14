import { OpenAPIHono } from '@hono/zod-openapi';
import { JwtVariables } from 'hono/jwt';
import { CompanyAppService } from '@application/services';
import { CompanyService } from '@domain/services';
import { CompanyRepository, SubscriptionRepository } from '@infrastructure/repositories';
import { MongoConnection } from '@infrastructure/repositories/config';
import { envs } from '@config';
import getCompanyById from './getCompanyById';
import getCompanyByTaxId from './getCompanyByTaxId';
import createCompany from './createCompany';
import updateCompany from './updateCompany';

const app = new OpenAPIHono<{ Variables: JwtVariables }>();

const mongoDb = MongoConnection.getInstance();

const companyRepository = new CompanyRepository(mongoDb);
const subscriptionRepository = new SubscriptionRepository(envs);

const companyService = new CompanyService(companyRepository, subscriptionRepository);
const companyAppService = new CompanyAppService(companyService);

app.openapi(
  getCompanyById.route,
  getCompanyById.createHandler(companyAppService),
);

app.openapi(
  getCompanyByTaxId.route,
  getCompanyByTaxId.createHandler(companyAppService),
);

app.openapi(
  createCompany.route,
  createCompany.createHandler(companyAppService),
);

app.openapi(
  updateCompany.route,
  updateCompany.createHandler(companyAppService),
);

export default app;
