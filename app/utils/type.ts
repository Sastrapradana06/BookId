export type UserContext = { user: { id: string; name: string; role: string } };
export type BookDB = {
  id: number;
  created_at: Date | string;
  judul_buku: string;
  penulis: string;
  genre: string;
  bahasa: string;
  pages: number;
  tahun_terbit: number;
  stok: number;
  terpinjam: number;
  pengembalian: number;
  cover: string;
};

export type MembersDB = {
  id: number;
  created_at: Date | string;
  foto_profil: string;
  username: string;
  email: string;
  wa: string;
  alamat: string;
  tgl_lahir: Date | string;
  jekel: string;
  role: string;
  status: string;
};
