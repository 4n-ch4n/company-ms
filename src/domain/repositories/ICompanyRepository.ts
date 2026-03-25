import { Company } from '../entities';

export interface ICompanyRepository {
  getCompanyById(id: string): Promise<Company | null>;
  getByTaxId(taxId: string): Promise<Company | null>;
  existsByTaxId(taxId: string): Promise<boolean>;
  createCompany(company: Company): Promise<void>;
  updateCompany(company: Company): Promise<void>;
}
