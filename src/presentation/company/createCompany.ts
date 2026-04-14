import { z } from 'zod';
import { JwtVariables } from 'hono/jwt';
import { createRoute, RouteHandler } from '@hono/zod-openapi';
import { CompanyAppService } from '@application/services';
import { CompanyResponseSchema } from '@config/schemas/company.schema';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  ErrorCode,
  ErrorResponseSchema,
  StatusCode,
  SuccessResponseSchema,
} from '@config/schemas/response';

const RequestBodySchema = z.object({
  name: z.string().openapi({
    example: 'Acme Corporation',
    description: 'The name of the company.',
  }),
  taxId: z.string().openapi({
    example: '12.345.678/0001-90',
    description: 'The tax ID of the company.',
  }),
  planId: z.uuid().openapi({
    example: '12345678-90ab-cdef-1234-567890abcdef',
    description: 'The ID of the subscription plan to subscribe to.',
  }),
  billingCycle: z.enum(['MONTHLY', 'ANNUAL']).openapi({
    example: 'MONTHLY',
    description: 'The billing cycle for the subscription.',
  }),
});

const route = createRoute({
  method: 'post',
  path: '/companies',
  summary: 'Create a new company',
  description: 'Creates a new company with the provided name and tax ID.',
  tags: ['Company'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: RequestBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Company created successfully',
      content: {
        'application/json': {
          schema: SuccessResponseSchema(CompanyResponseSchema),
        },
      },
    },
    400: {
      description: 'Bad Request - Invalid input data',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Unauthorized - Missing or invalid JWT token',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});

const createHandler = (
  companyAppService: CompanyAppService,
): RouteHandler<typeof route, { Variables: JwtVariables }> => {
  return async (c) => {
    try {
      const userId = c.get('jwtPayload').userId;
      const { name, taxId, planId, billingCycle } = c.req.valid('json');

      const company = await companyAppService.createCompany(
        {
          userId,
          name,
          taxId,
        },
        planId,
        billingCycle,
      );

      const response = new ApiSuccessResponse(
        StatusCode.CREATED,
        company,
        'Company created successfully',
      );

      return c.json(response.toJSON(), StatusCode.CREATED);
    } catch (error) {
      if (error instanceof ApiErrorResponse) {
        return c.json(error.toJSON(), error.status as any);
      }

      const errorResponse = new ApiErrorResponse(
        StatusCode.INTERNAL_ERROR,
        ErrorCode.UNKNOWN,
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );

      return c.json(errorResponse.toJSON(), StatusCode.INTERNAL_ERROR);
    }
  };
};

export default {
  route,
  createHandler,
};
