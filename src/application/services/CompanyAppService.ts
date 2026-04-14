import { ICompanyDTO } from '@application/DTOs';
import { CompanyMapper } from '@config/utils/mappers';
import { Company } from '@domain/entities';
import { CompanyService } from '@domain/services';

export class CompanyAppService {
  constructor(private companyService: CompanyService) {}

  async getCompanyById(id: string): Promise<Company | null> {
    const company = await this.companyService.getCompanyById(id);
    return company;
  }

  async getCompanyByTaxId(taxId: string): Promise<Company | null> {
    const company = await this.companyService.getCompanyByTaxId(taxId);
    return company;
  }

  async createCompany(
    companyDTO: ICompanyDTO,
    planId: string,
    billingCycle: 'MONTHLY' | 'ANNUAL',
  ): Promise<Company> {
    const company = CompanyMapper.mapCompanyDTOToEntity(companyDTO);
    const createdCompany = await this.companyService.createCompany(
      company,
      planId,
      billingCycle,
    );
    return createdCompany;
  }

  async updateCompany(companyDTO: ICompanyDTO): Promise<Company> {
    const company = CompanyMapper.mapCompanyDTOToEntity(companyDTO);
    const updatedCompany = await this.companyService.updateCompany(company);
    return updatedCompany;
  }
}
