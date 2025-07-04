export default function isEmpty(arr) {
  return arr.some((e) => !e?.trim());
}
