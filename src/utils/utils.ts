export function shuffleArray<Content>(origArray: Content[]): Content[] {
  // Thanks, https://stackoverflow.com/a/46545530

  return origArray.map(val => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ val }) => val)
}