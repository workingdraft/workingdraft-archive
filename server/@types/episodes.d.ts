declare type Episode = {
  id: number,
  date: string,
  duration: string,
  people: string[],
  href: string,
  audio: string,
  title: string
}

declare type EpisodeList = {
  [key: string]: Episode
}
