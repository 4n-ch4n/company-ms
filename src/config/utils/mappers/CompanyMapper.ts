import { ObjectId } from 'mongodb';
import { Company } from '@domain/entities';
import { ICompanyModel } from '@infrastructure/models';
import { ICompanyDTO } from '@application/DTOs';

export class CompanyMapper {
  public static mapCompanyDTOToEntity = (companyDto: ICompanyDTO): Company => {
    const id = companyDto.id || new ObjectId().toHexString();

    const companyEntity = new Company({
      id: id,
      userId: companyDto.userId,
      name: companyDto.name,
      taxId: companyDto.taxId,
    });

    return companyEntity;
  };

  public static mapCompanyModelToEntity = (company: ICompanyModel): Company => {
    if (!company) return {} as Company;
    const companyEntity = new Company({
      id: company._id.toHexString(),
      userId: company.user_id,
      name: company.name,
      taxId: company.tax_id,
      status: company.status,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    });

    return companyEntity;
  };

  public static mapCompanyEntityToModel = (company: Company): ICompanyModel => {
    return {
      _id: new ObjectId(company.id),
      user_id: company.userId,
      name: company.name,
      tax_id: company.taxId,
      status: company.status,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  };
}
