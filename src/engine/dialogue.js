export function isLastPage(dialogue, pageIndex) {
  return pageIndex >= dialogue.pages.length - 1;
}

export function nextPageIndex(dialogue, pageIndex) {
  return Math.min(pageIndex + 1, dialogue.pages.length - 1);
}

export function getPageText(dialogue, pageIndex) {
  return dialogue.pages[Math.max(0, Math.min(pageIndex, dialogue.pages.length - 1))];
}
