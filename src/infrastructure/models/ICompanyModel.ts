import { ObjectId } from 'mongodb';
import { CompanyStatus } from '@domain/value-objects';

export interface ICompanyModel {
  _id: ObjectId;
  user_id: string;
  name: string | null;
  tax_id: string | null;
  status: CompanyStatus | null;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
}
