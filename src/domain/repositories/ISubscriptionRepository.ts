import { ISubscription } from "@domain/value-objects";

export interface ISubscriptionRepository {
  createSubscription(
    companyId: string,
    planId: string,
    billingCycle: 'MONTHLY' | 'ANNUAL',
  ): Promise<ISubscription>;
}
