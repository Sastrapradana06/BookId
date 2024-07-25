import { useOutletContext } from "@remix-run/react";
import Container from "~/components/layout/container";
import { UserContext } from "~/utils/type";

export default function Books() {
  const { user } = useOutletContext<UserContext>();
  console.log({ user }, "user");

  return (
    <Container>
      <h1>Books</h1>
    </Container>
  );
}
