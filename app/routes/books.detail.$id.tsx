import { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import Container from "~/components/layout/container";

export const meta: MetaFunction = () => {
  return [
    { title: "Detail Books" },
    { name: "Detail Books", content: "Welcome to detail books" },
  ];
};

export default function DetailBooks() {
  const params = useParams();
  console.log(params);

  return (
    <Container>
      <h1>Detail Books {params.id}</h1>
    </Container>
  );
}
