import { envs } from '@config';
import { Db, MongoClient } from 'mongodb';

export interface IMongo {
  db: Db;
}

export class MongoConnection implements IMongo {
  private static instance: MongoConnection;
  private client: MongoClient;
  private mongoDb: Db | null = null;

  private constructor() {
    const uri = envs.mongo.connectionString;
    this.client = new MongoClient(uri);
    this.init();
  }

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async init(): Promise<void> {
    if (this.mongoDb) return;

    const mongodb = await this.client.connect();
    this.mongoDb = mongodb.db();
  }

  public get db(): Db {
    if (!this.mongoDb) {
      throw new Error(
        'MongoConnection has not been initialized. Call init() first.',
      );
    }
    return this.mongoDb;
  }
}
