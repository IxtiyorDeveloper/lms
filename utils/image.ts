export function checkImageURL(url: string) {
  return url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/) != null;
}
