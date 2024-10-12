export function createItemName(itemName: string) {
  let result: string = "";
  if (itemName.length < 21) result = itemName;
  else {
    result =
      itemName.slice(0, 12) +
      "..." +
      itemName.split("").reverse().slice(0, 7).reverse().join("");
  }
  return result;
}
