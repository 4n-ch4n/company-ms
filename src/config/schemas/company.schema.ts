import { z } from 'zod';

export const CompanyResponseSchema = z.object({
  id: z.uuid().openapi({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the company',
  }),
  userId: z.uuid().openapi({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'Unique identifier for the user associated with the company',
  }),
  name: z.string().nullable().openapi({
    example: 'Acme Corporation',
    description: 'Name of the company',
  }),
  taxId: z.string().nullable().openapi({
    example: '123456789',
    description: 'Tax identification number of the company',
  }),
  status: z
    .string()
    .nullable()
    .openapi({
      examples: ['ACTIVE', 'SUSPENDED', 'INACTIVE'],
      description: 'Status of the company (e.g., active, inactive)',
    }),
  createdAt: z.date().or(z.string()).nullable().openapi({
    example: '2024-01-01T00:00:00Z',
    description: 'Timestamp when the company was created',
  }),
  updatedAt: z.date().or(z.string()).nullable().openapi({
    example: '2024-01-02T00:00:00Z',
    description: 'Timestamp when the company was last updated',
  }),
});
