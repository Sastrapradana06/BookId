import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Container from "~/components/layout/container";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return user;
};

export default function Dashboard() {
  const user: { id: string; name: string } = useLoaderData();

  return (
    <Container>
      <h1>Selamat Datang {user.name}</h1>
    </Container>
  );
}
