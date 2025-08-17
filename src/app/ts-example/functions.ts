import { 관리자, 일반유저, User } from "./users";

function something(user: User) {
  if (user.role === "admin") {
    console.log(user.permissions);
  }
  if (user.role === "user") {
    console.log(user.personalInfo);
  }
}
