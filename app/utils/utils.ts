export function getFirstLetters(name: string) {
  const words = name.split(" ");
  const firstLetters = words.map((word) => word.charAt(0));
  return firstLetters.join("");
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
}

export function calculateRating(borrowed: number, stock: number) {
  const ratio = borrowed / stock;
  const rating = Math.min(5, Math.max(0, Math.round(ratio * 5)));

  return rating;
}

export function extractFilePath(url: string) {
  const newUrl = url.replace(
    `https://dwmglhdhykrtxniqhrgn.supabase.co/storage/v1/object/public/cover_book/`,
    ""
  );
  if (newUrl.includes("%20")) {
    const result = newUrl.replace("%20", " ");
    return result;
  } else {
    return newUrl;
  }
}
