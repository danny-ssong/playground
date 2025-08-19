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
