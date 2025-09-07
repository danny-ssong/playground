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

type UserRoleMap<S extends SubscriptionType> = {
  admin: BaseUser<"admin", S> & {
    permissions: string[];
  };
  user: BaseUser<"user", S> & {
    personalInfo: {
      name: string;
    };
  };
};

interface BaseUser<TRole extends UserType, TSubscription extends SubscriptionType> {
  id: string;
  role: TRole;
  subscriptionType: TSubscription;
  subscription: UserSubscriptionMap[TSubscription];
}

type UserMap = {
  [K in SubscriptionType]: UserRoleMap<K>[UserType];
};

export type User = UserMap[SubscriptionType];
