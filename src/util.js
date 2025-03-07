export function createSlug(title) {
  return title.toLowerCase().replaceAll(" ", "-");
}
