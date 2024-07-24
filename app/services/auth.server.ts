// utils/auth.server.ts
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";

interface User {
  id: string;
  name: string;
}

// Buat instance Authenticator
const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    if (email === "admin@gmail.com" && password === "123456") {
      return { id: "1", name: "Admin" };
    }
    throw new Error("Invalid credentials");
  })
);

export { authenticator };
