import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import Logo from "~/components/ui/logo";
import { json, redirect, useActionData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { commitSession, getSession } from "~/services/session.server";
import FormLogin from "~/components/template/form-login";

export const meta: MetaFunction = () => {
  return [
    { title: "BookID" },
    { name: "description", content: "Welcome to BookId" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const user = await authenticator.authenticate("form", request);
    const session = await getSession(request.headers.get("Cookie"));
    session.set(authenticator.sessionKey, user);

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }
};

export default function Index() {
  const actionData = useActionData<typeof action>();
  return (
    <main className="w-full h-[100vh]   flex flex-col items-center justify-center ">
      <div className="w-max h-[100px]  ">
        <Logo />
      </div>
      <div className="w-[90%] h-max  flex lg:justify-center lg:items-center bg-slate-100 py-6 px-2 rounded-xl lg:w-[80%] -mt-6">
        <div className="w-max h-max hidden lg:inline-block ">
          <img
            src="/icons-login1.png"
            alt="icons-login "
            className="w-[400px]  object-contain"
          />
        </div>
        <FormLogin actionData={actionData} />
      </div>
    </main>
  );
}
