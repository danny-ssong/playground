import { User } from "./good-complex.user";

function something(user: User) {
  if (user.role === "admin") {
    console.log(user.permissions);
  }
  if (user.subscriptionType === "basic") {
    console.log(user.subscription.nextBillingDate);
  }
}
