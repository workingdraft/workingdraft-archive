import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

let peopleData: People;
let episodeData: EpisodeList;

const data = new Map();

let initialValue: PeopleCluster = {
  team: new Map<string, Person>(),
  alumni: new Map<string, Person>(),
  guests: new Map<string, Person>()
};

let initialEpisode = new Map<string, number[]>();

const peopleReducer = (accumulator: PeopleCluster, currentValue: Person) => {
  if (currentValue.team && currentValue.team.length === 1) {
    accumulator.team.set(currentValue.id, currentValue);
  } else if (currentValue.team && currentValue.team.length === 2) {
    accumulator.alumni.set(currentValue.id, currentValue);
  } else {
    accumulator.guests.set(currentValue.id, currentValue);
  }
  return accumulator;
};

const episodeReducer = (accumulator: typeof initialEpisode, currentValue: Episode) => {
  currentValue.people
    .forEach((person) => {
      let entry = accumulator.get(person);
      if (typeof entry === 'undefined') {
        entry = [];
      }
      entry.push(currentValue.id);
      accumulator.set(person, entry);
    })
  return accumulator;
}

const clusterPeople = async (people: People, episodes: Map<string, number[]>) => {
  const allPeople = Object.keys(people)
    .map(key => Object.assign(people[key], { id: key, episodes: episodes.get(key).length }))
    .reduce(peopleReducer, initialValue);
  return allPeople;
};

const clusterEpisodes = async (episodes: EpisodeList) => {
  const allEpisodes = Object.keys(episodes)
    .map(key => episodes[key])
    .reduce(episodeReducer, initialEpisode);
  return allEpisodes;
}

const sortByEpisodeCount = (people: Map<string, Person>) => {
  const peopleArray = Array.from(people);
  peopleArray.sort((a, b) => {
    return b[1].episodes - a[1].episodes;
  })
  return new Map(peopleArray);
}

const getData = async () => {
  const people = await readFile('./data/people.json', 'utf-8');
  peopleData = JSON.parse(people);
  const episodes = await readFile('./data/episodes.json', 'utf-8');
  episodeData = JSON.parse(episodes);

  const allEpisodes = await clusterEpisodes(episodeData);
  const allPeople = await clusterPeople(peopleData, allEpisodes);

  allPeople.guests = sortByEpisodeCount(allPeople.guests);
  return {
    people: allPeople,
    episodes: episodeData,
    peopleEpisodes: allEpisodes,
  }
};

export default getData;
