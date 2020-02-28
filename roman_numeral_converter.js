function convertToRoman(num) {
  let decVal = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  let romanNum = [
    "I",
    "IV",
    "V",
    "IX",
    "X",
    "XL",
    "L",
    "XC",
    "C",
    "CD",
    "D",
    "CM",
    "M"
  ];

  let roman = "";

  for (let index = decVal.length - 1; index >= 0; index--) {
    while (decVal[index] <= num) {
      roman += romanNum[index];
      num -= decVal[index];
    }
  }

  return roman;
};

console.log(convertToRoman(891));