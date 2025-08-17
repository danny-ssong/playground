export type UserType = "admin" | "user" | "guest";

export type BaseUser<T extends UserType> = {
  id: string;
  role: T;
  email: string;
  lastLoginAt: Date;
};

export type UserMap = {
  admin: BaseUser<"admin"> & {
    permissions: string[];
  };
  user: BaseUser<"user"> & {
    personalInfo: {
      name: string;
      age: number;
    };
  };
  guest: BaseUser<"guest">;
};

export type User = UserMap[keyof UserMap];
export type 관리자 = UserMap["admin"];
export type 일반유저 = UserMap["user"];
export type 게스트 = UserMap["guest"];
