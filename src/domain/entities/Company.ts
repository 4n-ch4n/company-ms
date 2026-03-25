import { CompanyStatus } from '../value-objects';

export class Company {
  public id: string;
  public userId: string;
  public name: string | null;
  public taxId: string | null;
  public status: CompanyStatus | null;
  public createdAt: Date | string | null;
  public updatedAt: Date | string | null;

  constructor({
    id,
    userId,
    name = null,
    taxId = null,
    status = null,
    createdAt = null,
    updatedAt = null,
  }: {
    id: string;
    userId: string;
    name?: string | null;
    taxId?: string | null;
    status?: CompanyStatus | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  }) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.taxId = taxId;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
