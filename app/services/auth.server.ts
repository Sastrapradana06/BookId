// utils/auth.server.ts
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import { getuserByEmail } from "./supabase/fetch.server";
import { comparePassword } from "~/utils/utils";

interface User {
  id: string;
  name: string;
}

const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    const login = await handleLogin(email as string, password as string);
    if (!login.success) {
      return login;
    }

    return login.user;
  })
);

export const handleLogin = async (email: string, password: string) => {
  const user = await getuserByEmail(email);

  if (user.status === false || user.data.length === 0) {
    return {
      success: false,
      message: "Email tidak terdaftar",
    };
  }

  const validatePassword = comparePassword(password, user.data[0].password);

  if (!validatePassword) {
    return {
      success: false,
      message: "Periksa kembali password anda",
    };
  }
  return {
    success: true,
    message: "Login Berhasil",
    user: user.data[0],
  };
};

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
