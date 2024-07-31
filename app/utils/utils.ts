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
