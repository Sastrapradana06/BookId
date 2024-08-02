// utils/auth.server.ts
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";

interface User {
  id: string;
  name: string;
}

const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    if (email === "admin@gmail.com" && password === "123456") {
      return { id: "1", name: "Gakiong Khun", role: "super admin" };
    }
    throw new Error("Invalid credentials");
  })
);

async function getUser(request: Request) {
  const user = await authenticator.isAuthenticated(request);
  return user;
}

const isAuthUser = async (request: Request) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return false;
  }
  return true;
};

export { authenticator, getUser, isAuthUser };
