# 타입 추론 관련 예제

## 개요

특정 객체가 여러 타입이 존재하고 타입마다 객체의 속성이 다른 부분이 있을 때, 타입 단언('as') 없이 타입 추론을 통해 깔끔한 코드를 작성하는 방법

ex) 유저는 관리자, 일반 유저, 게스트 등의 타입이 있고, 타입별로 유저가 갖는 속성이 조금씩 다를 때

## 기존 방식의 문제

`role` 별로 유저가 갖는 속성이 조금씩 다를 때, `role` 를 이용해 유저의 타입을 확인했음에도 불구하고, 타입 단언(`as`)를 사용해야 했음

### 기존 타입 정의

```typescript
// bad-users.ts
export type UserType = "admin" | "user";

export interface BaseUser {
  id: string;
  role: UserType;
}

export type 관리자 = BaseUser & {
  permissions: string[];
};

export type 일반유저 = BaseUser & {
  personalInfo: {
    name: string;
  };
};
export type User = 관리자 | 일반유저;
```

### User 접근

```typescript
// bad-functions.ts
function something(user: User) {
  if (user.role === "admin") {
    //타입 단언 필요
    console.log((user as 관리자).permissions);
  }
  if (user.role === "user") {
    //타입 추론 에러
    console.log(user.personalInfo);
  }
}
```

## 해결

제네릭을 활용하여 타입 추론이 동작하도록 구현

### 개선된 타입 정의

```typescript
// good-users.ts
export type UserType = "admin" | "user";

export type BaseUser<T extends UserType> = {
  id: string;
  role: T;
};

export type UserMap = {
  admin: BaseUser<"admin"> & {
    permissions: string[];
  };
  user: BaseUser<"user"> & {
    personalInfo: {
      name: string;
    };
  };
};

export type User = UserMap[keyof UserMap];
export type 관리자 = UserMap["admin"];
export type 일반유저 = UserMap["user"];
```

or

### 인터페이스 사용예시

```typescript
// good-users2.ts
export type UserType = "admin" | "user";

export interface BaseUser<T extends UserType> {
  id: string;
  role: T;
}

export interface 관리자 extends BaseUser<"admin"> {
  permissions: string[];
}

export interface 일반유저 extends BaseUser<"user"> {
  personalInfo: {
    name: string;
  };
}

export type User = 관리자 | 일반유저;
```

### User 접근

```typescript
// good-functions.ts
function something(user: User) {
  if (user.role === "admin") {
    //자동으로 '관리자' 타입 추론
    console.log(user.permissions);
  }
  if (user.role === "user") {
    //자동으로 '일반유저' 타입 추론
    console.log(user.personalInfo);
  }
}
```

<br>

## 복잡한 타입인 경우

아래와 같이 `role`, `subscriptionType`에 따라 프로퍼티가 바뀌는 경우

### 데이터 예시

```
{
  id: string,
  role: "user" | "admin",

  // role이 "User"일 때,
  personalInfo?: {
    "name": "홍길동"
  }
  // role이 "Admin"일 때,
  permssions?: [],


  subscriptionType: "basic" | "coupon"

  // subscriptionType이 "basic" 일 때,
  subscription: {
    "startDate": "2024-01-01T00:00:00.000Z",
    "nextBillingDate": "2024-02-01T00:00:00.000Z"
  },

  // subscriptionType이 "coupon" 일 때,
  subscription: {
    validDays: number;
    couponCode: string;
  },

}
```

### 타입 정의

```
// good-complex.user.ts
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

```

or

```
// good-complex.user2.ts
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

```

## 맺으며

매번 `as`로 타입 단언하는게 불편했고, 이건 ts의 단점이라 생각하며 넘겼는데

그냥 내가 모르는 것이었다....!
