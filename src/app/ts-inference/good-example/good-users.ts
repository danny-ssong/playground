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

export type User = UserMap[UserType];
export type 관리자 = UserMap["admin"];
export type 일반유저 = UserMap["user"];
