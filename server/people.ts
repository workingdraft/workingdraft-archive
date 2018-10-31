import * as express from 'express';
import getData from './data';
import * as fetch from 'isomorphic-fetch';

const router = express.Router();

let people: PeopleCluster;
let episodes: EpisodeList;
let peopleEpisodes: Map<string, number[]>;

(async () => {
  const result = await getData();
  people = result.people;
  episodes = result.episodes;
  peopleEpisodes = result.peopleEpisodes;
})()


router.get('/people/:id', (req, res) => {
  const person = req.params.id;
  const episodeNumbers = peopleEpisodes.get(person);
  const allEpisodes = episodeNumbers
    .map(episode => episodes[episode]);

  const personObj = people.team.get(req.params.id) 
    || people.alumni.get(req.params.id)
    || people.guests.get(req.params.id);

  res.send({
    person: personObj,
    episodes: allEpisodes.reverse()
  });
});


router.get('/people/:id/image', async (req, res) => {
  const imgStream = await fetch(`https://twitter.com/${req.params.id}/profile_image?size=bigger`);
  imgStream.body.pipe(res);
});

router.get('/people', (req, res) => {
  const result = {
    team: [...people.team],
    alumni: [...people.alumni],
    guests: [...people.guests]
  }
  res.send(result);
});



export const Router = router;
