import axios from 'axios';
import { ISubscriptionRepository } from '@domain/repositories';
import {
  ICreateSubscriptionResponse,
  ISubscription,
} from '@domain/value-objects';
import { envs } from '@config';

export class SubscriptionRepository implements ISubscriptionRepository {
  constructor(private environments: typeof envs) {}

  async createSubscription(
    companyId: string,
    planId: string,
    billingCycle: 'MONTHLY' | 'ANNUAL',
  ): Promise<ISubscription> {
    try {
      const response = await axios.post<ICreateSubscriptionResponse>(
        `${this.environments.services.subscriptionMS}/subscriptions`,
        { companyId, planId, billingCycle },
      );

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Failed to create subscription in subscription-ms: ${
            error.response.data?.message || error.message
          }`,
        );
      }
      throw error;
    }
  }
}
