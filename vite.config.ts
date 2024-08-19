import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("api/auth/login", "routes/api/auth/login.tsx", {
            index: true,
          });
          route("api/auth/logout", "routes/api/auth/logout.tsx", {
            index: true,
          });

          route("api/tambah-books", "routes/api/books/tambah-books.tsx", {
            index: true,
          });
          route("api/edit-books", "routes/api/books/edit-books.tsx", {
            index: true,
          });
          route("api/delete-books", "routes/api/books/delete-books.tsx", {
            index: true,
          });

          route("api/tambah-members", "routes/api/members/tambah-members.tsx", {
            index: true,
          });
          route("api/delete-members", "routes/api/members/delete-members.tsx", {
            index: true,
          });

          route(
            "api/tambah-pinjaman",
            "routes/api/pinjaman/tambah-pinjaman.tsx",
            {
              index: true,
            }
          );

          route(
            "/api/update-profile",
            "routes/api/profile/update-profile.tsx",
            {
              index: true,
            }
          );
        });
      },
    }),
    tsconfigPaths(),
  ],
});
