// ============================================================
// DIALOGUE
// Keyed by id. `speaker` shows in the dialogue box header, `pages` are
// shown one at a time with a typewriter effect. Rewrite freely — nothing
// else in the game needs to change.
// ============================================================

export const DIALOGUE = {
  guide_monkey: {
    speaker: "GIDS",
    pages: [
      "Hé, jij daar! Welkom in de dierentuin.",
      "Gebruik de pijltjestoetsen of WASD om rond te lopen.",
      "Sta dicht bij iets en druk op SPATIE om te praten.",
      "Er lopen hier dieren rond met... interessante informatie.",
      "Verzamel herinneringen, ontdek geheimen, en hou je ogen open bij elk dier.",
      "Ze weten meer over je cadeaus dan je zou verwachten.",
      "Veel plezier, jarige verzorger!",
    ],
  },
  monkey_1: {
    speaker: "AAP",
    pages: [
      "Er verschijnt een wilde aap!",
      "OEH OEH AAH AAH!",
      "(Vertaling: waarschijnlijk iets over bananen.)",
      "Lara's apenkennis lijkt toe te nemen...",
    ],
  },
  monkey_2: {
    speaker: "AAP",
    pages: [
      "Deze doet radslagen.",
      "Hij is duidelijk aan het opscheppen.",
      "Hij weet donders goed dat er een dierenverzorger toekijkt.",
      "Deze verzorger weet duidelijk wat ze doet.",
    ],
  },
  monkey_special: {
    speaker: "???",
    pages: [
      "...",
      "...",
      "De aap kijkt recht in je ziel.",
      "Hij lijkt te weten waar je cadeau is.",
      "OEH OEH AAH AAH!",
      "De aap wijst naar iets dat je aan je favoriete plek doet denken.",
    ],
  },
  red_panda_1: {
    speaker: "RODE PANDA",
    pages: [
      "De rode panda kijkt je aan.",
      "Je voelt alsof hij je begrijpt.",
      "Hij houdt zijn kop schuin, volledig onaangedaan door het feit dat je vandaag 21 wordt.",
      "Er wacht iets zachts op je.",
    ],
  },
  tiger_1: {
    speaker: "TIJGER",
    pages: [
      "Een majestueus dier kijkt naar je vanaf de andere kant van het hek.",
      "Je voelt je ineens de hoofdpersoon.",
      "Hij knippert niet met zijn ogen. Jij ook niet, uit respect.",
      "Je volgende cadeau past niet in je zak.",
    ],
  },
  gorilla_1: {
    speaker: "GORILLA",
    pages: [
      "Een indrukwekkende gorilla zit rustig in de schaduw.",
      "Hij bekijkt je van top tot teen.",
      "Je krijgt het gevoel dat hij precies weet wat je van plan bent.",
      "(Dat weet hij niet. Hij is een gorilla.)",
    ],
  },
  gorilla_2: {
    speaker: "GORILLA",
    pages: [
      "Deze gorilla trommelt even op zijn borst.",
      "Puur voor de show, waarschijnlijk.",
      "Toch behoorlijk indrukwekkend.",
    ],
  },
  capybara_1: {
    speaker: "CAPIBARA",
    pages: [
      "De capibara oogt ontzettend kalm.",
      "Hij heeft geen idee dat jij vandaag 21 wordt.",
      "Eerlijk gezegd is dat waarschijnlijk de gezondste instelling.",
      "Ontspan.",
      "Je cadeau draait om alles heel rustig aan doen.",
    ],
  },
  capybara_2: {
    speaker: "CAPIBARA",
    pages: [
      "Deze capibara heeft zich al minutenlang niet bewogen.",
      "Je respecteert de toewijding.",
      "10/10 sfeer. Zou hier ook wel een dutje willen doen.",
    ],
  },
  plaza_sign: {
    speaker: "BORD",
    pages: [
      "WELKOM OP HET DIERENTUINPLEIN",
      "Voer de dierenverzorger alstublieft niet. Ze krijgt al genoeg liefde en milde chaos.",
    ],
  },
  final_locked: {
    speaker: "CADEAU",
    pages: [
      "Er staat hier een groot ingepakt cadeau.",
      "Het beweegt niet — nog niet.",
      "Ga praten met de dieren in de dierentuin en kom erachter wat er in mij schuilt",
      "Heb je ze allemaal gevonden? Kom dan zo snel mogelijk naar mij terug!",
    ],
  },
  secret_hidden_monkey: {
    speaker: "???",
    pages: [
      "Je gluurt achter de boom.",
      "Er zat de hele tijd al een aap verstopt.",
      "Hij kijkt bijna beledigd dat je hem gevonden hebt.",
      "Lara's apenkennis lijkt toe te nemen...",
    ],
  },
  secret_joke_sign: {
    speaker: "BORD",
    pages: [
      "GEVAAR: VERZORGER AANWEZIG",
      "Bekend om het voeren van apen, redden van capibara's, en het stelen van harten.",
      "Benader met snacks en enthousiasme.",
    ],
  },
  secret_bench: {
    speaker: "(jij)",
    pages: [
      "Je gaat zitten.",
      "Even is alles stil.",
      "Je denkt aan alle avonturen die nog op je wachten.",
      "Op de een of andere manier doet dit kleine dierentuintje je beseffen hoeveel geluk je hebt.",
    ],
  },
  secret_flower: {
    speaker: "BLOEM",
    pages: [
      "Hier groeit één enkele bloem, een beetje uit de toon.",
      "Hij ruikt naar elke fijne middag die je ooit hebt gehad.",
      "Geen hint hier. Gewoon een mooie bloem. Graag gedaan.",
    ],
  },
  secret_unlock: {
    speaker: "(jij)",
    pages: [
      "Achter het bord op het plein vind je iets dat je eerder gemist hebt.",
      "Een briefje, een beetje verfomfaaid.",
      '"Als je dit leest, heb je goed opgelet."',
      '"Dat is heel erg jouw stijl. Ga zo door."',
    ],
  },
  secret_creator: {
    speaker: "DE MAKER",
    pages: [
      "Psst. Ja, jij.",
      "Deze hele dierentuin bestaat omdat iemand veel te lang pixel-capibara's voor je heeft getekend.",
      "Gefeliciteerd, Lekkerding.",
      "Ga opzoek naar dieren die iets over je cadeau weten en vind alle herinneringen.",
    ],
  },
  entrance_sign: {
    speaker: "BORD",
    pages: [
      "DIERENTUIN INGANG",
      "Thuis aan rode panda's, tijgers, capibara's, gorilla's, en een verontrustend aantal apen.",
      "Opgericht vandaag. Bevolking: 1 verzorger, 21 jaar jong.",
    ],
  },
};
