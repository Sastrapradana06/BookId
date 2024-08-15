// utils/auth.server.ts
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import { getDataById, getuserByEmail } from "./supabase/fetch.server";
import { comparePassword, hashPassword } from "~/utils/utils";
import { updateDataDb } from "./supabase/update.server";

interface User {
  id: string;
  name: string;
}

type GantiPasswordType = {
  id: number;
  password_lama: string;
  password_baru: string;
};

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

export const gantiPasswordUser = async (data: GantiPasswordType) => {
  const user = await getDataById("data members", data.id);

  if (user.status === false || user.data.length === 0) {
    return {
      success: false,
      message: "Tidak ditemukan user",
    };
  }

  const validatePassword = comparePassword(
    data.password_lama,
    user.data[0].password
  );

  if (!validatePassword) {
    return {
      success: false,
      message: "Periksa kembali password lama anda",
    };
  }

  const updatePassword = await updateDataDb("data members", data.id, {
    password: hashPassword(data.password_baru),
  });

  if (updatePassword.status === false)
    return {
      success: false,
      message: "Gagal update password",
    };

  return {
    success: true,
    message: "Password Berhasil diubah",
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
  return user;
};

export { authenticator, getUser, isAuthUser };
