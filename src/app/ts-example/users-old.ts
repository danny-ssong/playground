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
