export function checkURL(url: string) {
  return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
}
