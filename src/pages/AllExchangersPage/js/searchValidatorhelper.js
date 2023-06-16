export default function validateInputValueForSearch(e) {
  const t = {
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
  let o = "";
  for (let r = 0; r < e.length; r++) {
    const a = e.charAt(r),
      n = t[a.toLowerCase()] || a;
    o += a === a.toLowerCase() ? n : n.toUpperCase();
  }
  return o;
}
