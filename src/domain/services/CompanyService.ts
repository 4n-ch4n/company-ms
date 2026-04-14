import {
  ApiErrorResponse,
  ErrorCode,
  StatusCode,
} from '@config/schemas/response';
import { Company } from '../entities';
import { ICompanyRepository, ISubscriptionRepository } from '../repositories';

export class CompanyService {
  constructor(
    private companyRepository: ICompanyRepository,
    private subscriptionRepository: ISubscriptionRepository,
  ) {}

  async getCompanyById(id: string): Promise<Company | null> {
    const company = await this.companyRepository.getCompanyById(id);
    return company;
  }

  async getCompanyByTaxId(taxId: string): Promise<Company | null> {
    const company = await this.companyRepository.getByTaxId(taxId);
    return company;
  }

  async existsByTaxId(taxId: string): Promise<boolean> {
    const exists = await this.companyRepository.existsByTaxId(taxId);
    return exists;
  }

  async createCompany(
    company: Company,
    planId: string,
    billingCycle: 'MONTHLY' | 'ANNUAL',
  ): Promise<Company> {
    const alreadyExists = await this.existsByTaxId(company.taxId!);
    if (alreadyExists) {
      throw new ApiErrorResponse(
        StatusCode.CONFLICT,
        ErrorCode.FAILURE,
        'Company with the same tax ID already exists',
      );
    }

    company.createdAt = new Date();
    company.status = 'ACTIVE';

    await this.companyRepository.createCompany(company);

    try {
      await this.subscriptionRepository.createSubscription(
        company.id,
        planId,
        billingCycle,
      );
    } catch (error) {
      console.error('Failed to create subscription:', error);
      throw new ApiErrorResponse(
        StatusCode.INTERNAL_ERROR,
        ErrorCode.FAILURE,
        'Company created but failed to create subscription',
      );
    }

    return company;
  }

  async updateCompany(company: Company): Promise<Company> {
    company.updatedAt = new Date();
    await this.companyRepository.updateCompany(company);
    return company;
  }
}
