import { reactive } from "vue";

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getGreeting() {
  const output = [
    "Hellur",
    "Hallo",
    "Olá",
    "Ciao",
    "こんにちは",
    "Hola",
    "你好",
    "Witaj",
    "გამარჯობა",
    "Hei",
    "Kamusta",
    "Tere",
    "مرحبا",
    "Sveiki",
    "Salve",
    "Sannu",
    "Здрастуйте",
    "Hej",
    "Zdravo",
    "Привет",
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
    "សួស្តី",
    "Lumela",
    "ສະບາຍດີ",
    "Ahoj",
    "안녕하세요",
    "नमस्ते",
    "Slav",
    "שלום",
    "Kaixo",
    "Salam",
    "ሰላም",
    "Բարեւ Ձեզ",
    "Сайн уу",
    "Kia ora",
    "नमस्कार",
    "สวัสดี",
    "Salama",
    "Салом",
  ];

  return [
    "Hello",
    "Bonjour",
    "Kon'nichiwa",
    "Nnọọ",
    "Amedi",
    "Pẹlẹ o",
    ...shuffleArray(output),
  ];
}
