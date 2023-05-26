export default function validateInputValueForSearch(value) {
  const translitMap = {
    й: "q",
    ц: "w",
    у: "e",
    к: "r",
    е: "t",
    н: "y",
    г: "u",
    ш: "i",
    щ: "o",
    з: "p",
    х: "[",
    ъ: "]",
    ф: "a",
    ы: "s",
    в: "d",
    а: "f",
    п: "g",
    р: "h",
    о: "j",
    л: "k",
    д: "l",
    ж: ";",
    э: "'",
    я: "z",
    ч: "x",
    с: "c",
    м: "v",
    и: "b",
    т: "n",
    ь: "m",
    б: ",",
    ю: ".",
  };
  let result = "";
  for (let i = 0; i < value.length; i++) {
    const char = value.charAt(i);
    const translitChar = translitMap[char.toLowerCase()] || char;
    result +=
      char === char.toLowerCase() ? translitChar : translitChar.toUpperCase();
  }
  return result;
}
