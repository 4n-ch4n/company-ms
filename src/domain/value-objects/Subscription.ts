export interface ICreateSubscriptionResponse {
  isError: boolean;
  status: number;
  code: string;
  message: string;
  data: ISubscription;
}

export interface ISubscription {
  id: string;
  companyId: string;
  planId: string;
  status: 'ACTIVE' | 'TRIALING' | 'PENDING' | 'CANCELLED';
  startDate: Date | string;
  endDate: Date | string;
  nextBillingDate: Date | string;
  billingCycle: 'MONTHLY' | 'ANNUAL';
  autoRenew: boolean;
  cancelReason: string | null;
  canceledAt: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  usages: any[];
}
