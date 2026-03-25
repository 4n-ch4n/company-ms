import { ObjectId } from 'mongodb';
import { Company } from '@domain/entities';
import { ICompanyRepository } from '@domain/repositories';
import { CompanyMapper } from '@config/utils/mappers';
import { IMongo } from './config';
import { ICompanyModel } from '../models';

export class CompanyRepository implements ICompanyRepository {
  private mongoCollection: string = 'companies';

  constructor(private mongo: IMongo) {}

  async getCompanyById(id: string): Promise<Company | null> {
    const company = await this.mongo.db
      .collection<ICompanyModel>(this.mongoCollection)
      .findOne({ _id: new ObjectId(id) });
    if (!company) return null;

    return CompanyMapper.mapCompanyModelToEntity(company);
  }

  async getByTaxId(taxId: string): Promise<Company | null> {
    const company = await this.mongo.db
      .collection<ICompanyModel>(this.mongoCollection)
      .findOne({ tax_id: taxId });
    if (!company) return null;

    return CompanyMapper.mapCompanyModelToEntity(company);
  }

  async existsByTaxId(taxId: string): Promise<boolean> {
    const company = await this.mongo.db
      .collection<ICompanyModel>(this.mongoCollection)
      .findOne({ tax_id: taxId });

    return !!company;
  }

  async createCompany(company: Company): Promise<void> {
    const companyToSave = CompanyMapper.mapCompanyEntityToModel(company);
    await this.mongo.db
      .collection(this.mongoCollection)
      .insertOne(companyToSave);
  }

  async updateCompany(company: Company): Promise<void> {
    const companyToUpdate = CompanyMapper.mapCompanyEntityToModel(company);

    const { _id, ...updateFields } = companyToUpdate as any;

    await this.mongo.db
      .collection(this.mongoCollection)
      .updateOne({ _id: new ObjectId(company.id) }, { $set: updateFields });
  }
}
