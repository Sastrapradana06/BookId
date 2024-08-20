export type UserContext = {
  user: {
    id: number;
    created_at: Date | string;
    foto_profil: string;
    username: string;
    email: string;
    wa: string;
    alamat: string;
    tgl_lahir: string;
    jekel: string;
    role: string;
    status: string;
    password?: string;
  };
};
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

export type PinjamanType = {
  id: number;
  created_at: Date | string;
  nama_peminjam: string;
  no_ktp: string;
  id_buku: number;
  judul_buku: string;
  tgl_dipinjam: string;
  tgl_pengembalian: Date | string;
  id_member: number;
  status: string;
};
