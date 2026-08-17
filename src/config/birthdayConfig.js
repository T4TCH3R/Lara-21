// ============================================================
// PERSONALIZE THE GAME HERE
// This is the ONLY file you should need to touch to change the
// names, age, title, and final birthday message.
// Everything else (dialogue, gifts, memories) lives in src/data/
// ============================================================

export const birthdayConfig = {
  // The birthday hero
  name: "Lara",
  age: 21,

  // You! Shown as the sender of the final message.
  partnerName: "Luca",

  // Title screen text
  title: "LARA'S 21ste AVONTUUR",
  subtitle: "Een Zeer Speciale Dierentuinexpeditie",

  // Shown during the intro sequence, one line at a time.
  introLines: [
    "Welkom, Lara!",
    "Vandaag is een heel belangrijke dag...",
    "Je hebt Level 21 bereikt.",
    "Maar er lijkt iets verstopt te zitten in de dierentuin...",
    "Misschien moet je op onderzoek uit.",
  ],

  // How many memories exist in total (must match src/data/memories.js length)
  totalMemories: 8,

  // The big personal message revealed at the very end.
  // Write from the heart — this is the one part the game can't write for you.
  finalMessage: `
Lara,

Speciaal voor jou deze (mini) game met onze leukste herinneringen. Natuurlijk onze eerste foto samen want die heeft dit allemaal gestart. Volgensmij heb ik je al heeeeel vaak gezegd wat ik wel niet allemaal leuk aan jou vind maar bij deze. Je lach, je ogen, je humor wanneer ik met jou samen ben kan mijn dag niet meer stuk. Ook ga je nu een grote stap maken in je leven namelijk op jezelf wonen!!! Echt facking leuk, je hebt al veel spullen verzameld voor je nieuwe huisje maar nog niet alles. Daarom de cadeatjes die je zo zult krijgen, ook neem ik je binnenkort mee naar Diergaarde Blijdorp. 

Ik hou van jou x.

Liefs,
Luca <3
  `.trim(),

  // Short line shown right above the final message, before it's revealed.
  finalIntroLines: [
    "Je hebt het gehaald.",
    "Je hebt elk hoekje van de dierentuin verkend.",
    "Je hebt de dieren gevonden.",
    "Je hebt de herinneringen gevonden.",
    "En nu...",
    "Heb je je laatste verrassing gevonden.",
  ],
};

export default birthdayConfig;
