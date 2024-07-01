// @ts-ignore
const B7_BASE_CHARS = [
  "@",
  "Δ",
  " ",
  "0",
  "¡",
  "P",
  "¿",
  "p",
  "£",
  "_",
  "!",
  "1",
  "A",
  "Q",
  "a",
  "q",
  "$",
  "Φ",
  "“",
  "2",
  "B",
  "R",
  "b",
  "r",
  "¥",
  "Γ",
  "#",
  "3",
  "C",
  "S",
  "c",
  "s",
  "è",
  "Λ",
  "¤",
  "4",
  "D",
  "T",
  "d",
  "t",
  "é",
  "Ω",
  "%",
  "5",
  "E",
  "U",
  "e",
  "u",
  "ù",
  "Π",
  "&",
  "6",
  "F",
  "V",
  "f",
  "v",
  "ì",
  "Ψ",
  "'",
  "7",
  "G",
  "W",
  "g",
  "w",
  "ò",
  "Σ",
  "(",
  "8",
  "H",
  "X",
  "h",
  "x",
  "Ç",
  "Θ",
  ")",
  "9",
  "I",
  "Y",
  "i",
  "y",
  "\n",
  "Ξ",
  "*",
  ":",
  "J",
  "Z",
  "j",
  "z",
  "Ø",
  "\t",
  "+",
  ";",
  "K",
  "Ä",
  "k",
  "ä",
  "ø",
  "Æ",
  ",",
  "<",
  "L",
  "Ö",
  "l",
  ",ö",
  "æ",
  "-",
  "=",
  "M",
  "Ñ",
  "m",
  "ñ",
  "Å",
  "ß",
  ".",
  ">",
  "N",
  "Ü",
  "n",
  "ü",
  "å",
  "É",
  "/",
  "?",
  "O",
  "§",
  "o",
  "à",
];
const B7_2SIZED_CHARS = ["|", "^", "€", "{", "}", "[", "]", "~", "\\"];
const B7_SMS_COUNT = {
  "0": [0, 0],
  "1": [1, 160],
  "2": [161, 304],
  "3": [305, 456],
  "4": [457, 608],
  "5": [609, 760],
  "6": [761, 912],
  "7": [913, 1064],
  "8": [1065, 1216],
  "9": [1217, 1368],
  "10": [1269, 1520],
  "11": [1521, 1600],
  max: ["_", 1600],
};
const UNICODE_SMS_COUNT = {
  "0": [0, 0],
  "1": [1, 70],
  "2": [71, 132],
  "3": [133, 198],
  "4": [199, 264],
  "5": [264, 330],
  "6": [331, 396],
  "7": [396, 462],
  "8": [463, 528],
  "9": [529, 594],
  "10": [595, 660],
  "11": [661, 726],
  "12": [727, 792],
  "13": [792, 858],
  "14": [859, 924],
  "15": [925, 990],
  "16": [991, 1056],
  "17": [1057, 1122],
  "18": [1123, 1188],
  "19": [1189, 1254],
  "20": [1255, 1320],
  "21": [1321, 1386],
  "22": [1387, 1452],
  "23": [1453, 1518],
  "24": [1519, 1584],
  "25": [1585, 1600],
  max: ["_", 1600],
};

const B7_CHARS = [...B7_BASE_CHARS, ...B7_2SIZED_CHARS];

function uniq(array: any[]) {
  let uniq: any = [];
  array.forEach((elem) => {
    uniq.indexOf(elem) < 0 && uniq.push(elem);
  });
  return uniq;
}

function count_2chars_sized(sms: any) {
  let res = 0;
  sms.forEach((letter: any) => {
    res += B7_2SIZED_CHARS.indexOf(letter) == -1 ? 0 : 1;
  });
  return res;
}

function calcSmsCount(char_count: number, is_unicode: any) {
  const base: any = is_unicode ? UNICODE_SMS_COUNT : B7_SMS_COUNT;
  let sms_count = 0;
  while (42) {
    if (!base[sms_count] || base[sms_count][1] >= char_count) {
      break;
    }
    sms_count++;
  }
  return sms_count;
}

export function calcCharAndSmsCount(sms: any) {
  const result: any = calcCharCount(sms);
  result.sms_count = calcSmsCount(result.char_count, result.is_unicode);
  return result;
}

function calcCharCount(sms: any) {
  sms = (sms || "").split("");
  const is_7_bits = uniq([...sms, ...B7_CHARS]).length == B7_CHARS.length;
  if (is_7_bits) {
    return {
      char_count: sms.length + count_2chars_sized(sms),
      is_unicode: false,
    };
  } else {
    return {
      char_count: sms.length,
      is_unicode: true,
    };
  }
}

function calcMaxCharCount(sms_count: any) {
  let gsm7: any =
    B7_SMS_COUNT[sms_count.toString() as keyof typeof B7_SMS_COUNT];
  let unicode: any =
    UNICODE_SMS_COUNT[sms_count.toString() as keyof typeof UNICODE_SMS_COUNT];
  gsm7 = (gsm7 === undefined && sms_count ? B7_SMS_COUNT["max"] : gsm7)[1];
  unicode = (
    unicode === undefined && sms_count ? UNICODE_SMS_COUNT["max"] : unicode
  )[1];
  return {
    gsm7,
    unicode,
  };
}

function canBeSent(sms_body: any, max_sms: any) {
  const char_count = calcCharCount(sms_body),
    max_char = calcMaxCharCount(max_sms),
    is_unicode = char_count.is_unicode;
  return char_count.char_count <= max_char[is_unicode ? "unicode" : "gsm7"];
}
