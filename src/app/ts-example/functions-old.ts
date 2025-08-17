import { 관리자, 일반유저, User } from "./users-old";

function something(user: User) {
  if (user.role === "admin") {
    console.log((user as 관리자).permissions);
  }
  if (user.role === "user") {
    console.log(user.personalInfo);
  }
}
