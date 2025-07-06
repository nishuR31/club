
// isEmptyArr

export default function isEmptyArr(arr) {
  return arr.some((e) => !e?.trim());
}
