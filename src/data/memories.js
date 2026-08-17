// ============================================================
// MEMORIES / PHOTO (+ ONE VIDEO) COLLECTIBLES
// Drop your own photos into /public/images/memories/ named
// memory-01.jpg through memory-07.jpg, plus one video: memory-08.mp4
// (or edit the filenames below — any entry can be `type: "video"`).
// Missing files show a tasteful placeholder instead of breaking anything.
//
// `tileX`/`tileY` is where the memory appears on the map.
// ============================================================

function mediaPath(filename) {
  // BASE_URL makes this resolve correctly both locally and on GitHub Pages
  // (e.g. https://USERNAME.github.io/lara-21/images/memories/...)
  return `${import.meta.env.BASE_URL}images/memories/${filename}`;
}

export const MEMORIES = [
  {
    id: 1,
    type: "image",
    image: mediaPath("memory-01.jpg"),
    title: "Herinnering #01",
    caption: "Onze allereerste foto samen die dit allemaal heeft veroorzaakt ;).",
    tileX: 5,
    tileY: 2,
  },
  {
    id: 2,
    type: "image",
    image: mediaPath("memory-02.jpg"),
    title: "Herinnering #02",
    caption: "Jij en ik op Groove, tja je weet wat deze avond gebeurt is uhuhm.",
    tileX: 3,
    tileY: 12,
  },
  {
    id: 3,
    type: "image",
    image: mediaPath("memory-03.jpg"),
    title: "Herinnering #03",
    caption: "Een van onze zoveele McDonalds/auto dates in het begin",
    tileX: 13,
    tileY: 13,
  },
  {
    id: 4,
    type: "image",
    image: mediaPath("memory-04.jpg"),
    title: "Herinnering #04",
    caption: "Wat moet ik nog meer zeggen deze macarons waren gewoon facking lekker.",
    tileX: 6,
    tileY: 19,
  },
  {
    id: 5,
    type: "image",
    image: mediaPath("memory-05.jpg"),
    title: "Herinnering #05",
    caption: "Jij zou een geweldige gorilla-verzorger maar mocht dat niet lukken dan kun je nog altijd geitenfluisteraar worden.",
    tileX: 5,
    tileY: 25,
  },
  {
    id: 6,
    type: "image",
    image: mediaPath("memory-06.jpg"),
    title: "Herinnering #06",
    caption: "Ja ik denk wel een van onze dikste fotos samen.",
    tileX: 15,
    tileY: 25,
  },
  {
    id: 7,
    type: "image",
    image: mediaPath("memory-07.jpg"),
    title: "Herinnering #07",
    caption: "Kleine terugblik op het weekendje in Keulen, liever wordt ik niet herinnert aan het schreeuwen in de achtbaan.",
    tileX: 15,
    tileY: 23,
  },
  {
    id: 8,
    type: "video",
    image: mediaPath("memory-08.mp4"),
    title: "Herinnering #08",
    caption: "Klein beetje verstopt, maar deze kon niet missen.",
    tileX: 17,
    tileY: 3,
  },
];
