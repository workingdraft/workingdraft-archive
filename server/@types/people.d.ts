declare type Person = {
  name: string,
  team?: string[],
  twitter?: string,
  web?: string,
  episodes?: number,
  id?: string
}

declare type People = {
  [key: string]: Person
}

type PeopleCluster = {
  team: Map<string, Person>,
  alumni: Map<string, Person>,
  guests: Map<string, Person>
};

type JSONPerson = [string, Person];

type PeopleProps = {
  team: JSONPerson[],
  alumni: JSONPerson[],
  guests: JSONPerson[]
}
