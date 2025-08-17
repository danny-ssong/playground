import { 관리자, 일반유저, User } from "./users";

function getPermission(user: 관리자) {
  return user.permissions;
}

function getPersonalInfo(user: 일반유저) {
  return user.personalInfo;
}

function getLastLoginAt(user: User) {
  return user.lastLoginAt;
}
