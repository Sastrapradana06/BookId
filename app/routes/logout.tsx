import { LoaderFunction, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { getSession, destroySession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const newHeaders = new Headers({
    "Set-Cookie": await destroySession(session),
  });

  await authenticator.logout(request, { redirectTo: "/" });

  return redirect("/", {
    headers: newHeaders,
  });
};

export default function Logout() {
  return null;
}
