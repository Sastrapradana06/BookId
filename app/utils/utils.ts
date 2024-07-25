export function getFirstLetters(name: string) {
  const words = name.split(" ");
  const firstLetters = words.map((word) => word.charAt(0));
  return firstLetters.join("");
}
