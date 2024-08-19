import { ActionFunction, json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const getIdBuku = formData.get("idBuku");
  return json({ getIdBuku });
};

export default function TambahPinjamanApi() {
  return null;
}
