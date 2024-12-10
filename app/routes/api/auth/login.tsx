/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { commitSession, getSession } from "~/services/session.server";

// export const action = async ({ request }: ActionFunctionArgs) => {
//   try {
//     const user = await authenticator.authenticate("form", request);
//     console.log({ user }, "login");

//     const session = await getSession(request.headers.get("Cookie"));
//     session.set(authenticator.sessionKey, user);

//     return redirect("/dashboard", {
//       headers: {
//         "Set-Cookie": await commitSession(session),
//       },
//     });
//   } catch (error: any) {
//     return json(
//       { success: false, message: "Periksa kembali email dan password" },
//       { status: 401 }
//     );
//   }
// };

export const action = async ({ request }: ActionFunctionArgs) => {
  const user: any = await authenticator.authenticate("form", request);

  if (user.success === false) {
    return json({ success: false, message: user.message }, { status: 401 });
  }

  if (user && user.status == "non-aktif") {
    return json(
      { success: false, message: "Akun anda sedang dinonaktifkan" },
      { status: 401 }
    );
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.set(authenticator.sessionKey, user);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Login() {
  return null;
}
