export default function randomLetter(): string {
  return (Math.floor(Math.random() * (35 - 10 + 1)) + 10).toString(36);
}
