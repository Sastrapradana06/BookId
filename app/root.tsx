import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import "./tailwind.css";
import { json, LoaderFunction } from "@remix-run/node";
import { getUser } from "./services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json({ user });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { user } = useLoaderData<{
    user: { id: string; name: string; role: string };
  }>();
  return <Outlet context={{ user }} />;
}

export function ErrorBoundary() {
  const error = useRouteError() as Error | undefined;

  if (isRouteErrorResponse(error)) {
    return (
      <div className="w-ful h-[100vh] flex justify-center items-center">
        <div className="">
          <img src="/404.png" alt="img" className="w-[300px] lg:w-[400px] " />
          <p className="text-center zain text-[1.5rem] lg:text-[1.8rem]">
            Error. Page not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1>Error!</h1>
      <p>{error?.message ?? "Unknown error"}</p>
    </>
  );
}
