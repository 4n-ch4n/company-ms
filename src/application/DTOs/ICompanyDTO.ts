import { CompanyStatus } from '@domain/value-objects';

export interface ICompanyDTO {
  id?: string;
  userId: string;
  name?: string;
  taxId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
