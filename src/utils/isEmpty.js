export default function isEmpty(arr) {
  return arr.some((field) => !field?.trim());
}
