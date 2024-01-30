export function generateRandomId() {
  const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
  return randomNumber;
}
