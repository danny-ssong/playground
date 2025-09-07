export type UserType = "admin" | "user";
export type SubscriptionType = "basic" | "coupon";

interface BasicSubscription {
  startDate: Date;
  nextBillingDate: Date;
}

interface CouponSubscription {
  validDays: number;
  couponCode: string;
}

type UserSubscriptionMap = {
  basic: BasicSubscription;
  coupon: CouponSubscription;
};

interface BaseUser<TRole extends UserType, TSubscription extends SubscriptionType> {
  id: string;
  role: TRole;
  subscriptionType: TSubscription;
  subscription: UserSubscriptionMap[TSubscription];
}

export interface 관리자<TSubscription extends SubscriptionType> extends BaseUser<"admin", TSubscription> {
  permissions: string[];
}

export interface 일반유저<TSubscription extends SubscriptionType> extends BaseUser<"user", TSubscription> {
  personalInfo: {
    name: string;
  };
}

type UserMap = {
  [K in SubscriptionType]: 관리자<K> | 일반유저<K>;
};

export type User = UserMap[SubscriptionType];
