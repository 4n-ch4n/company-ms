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
import { requirePermission } from '../middlewares';

const RequestBodySchema = z.object({
  id: z.string().openapi({
    example: '60c72b2f9b1d8e5a5c8f9e7d',
    description: 'The unique identifier of the company.',
  }),
  name: z.string().optional().openapi({
    example: 'Acme Corporation',
    description: 'The name of the company.',
  }),
  taxId: z.string().optional().openapi({
    example: '12.345.678/0001-90',
    description: 'The tax ID of the company.',
  }),
});

const route = createRoute({
  method: 'patch',
  path: '/companies',
  summary: 'Update an existing company',
  description:
    'Updates the details of an existing company based on the provided information.',
  tags: ['Company'],
  middleware: [requirePermission('company:edit')],
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
    200: {
      description: 'Company updated successfully',
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
    404: {
      description: 'Company not found',
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
      const { id, name, taxId } = c.req.valid('json');

      const company = await companyAppService.updateCompany({
        id,
        userId,
        name,
        taxId,
      });

      const response = new ApiSuccessResponse(
        StatusCode.OK,
        company,
        'Company updated successfully',
      );

      return c.json(response.toJSON(), StatusCode.OK);
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
