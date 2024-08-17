/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";

import Container from "~/components/layout/container";
import NavLink from "~/components/layout/nav-link";
import FormEditProfile from "~/components/template/form-edit-profile";

import { isAuthUser } from "~/services/auth.server";
const dataLink = [
  {
    name: "profile",
    link: "/profile",
  },
  {
    name: "Edit Password",
    link: "/profile/edit-password",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Profile user" },
    { name: "Profile", content: "Welcome to Profile" },
  ];
};
export const loader: LoaderFunction = async ({ request }) => {
  const user = await isAuthUser(request);
  if (!user) {
    return redirect("/");
  }

  return json({ user });
};

export default function ProfileIndex() {
  return (
    <Container>
      <section className="mt-1 lg:mt-0">
        <NavLink dataLink={dataLink} />
        <FormEditProfile />
      </section>
    </Container>
  );
}
