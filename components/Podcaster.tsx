import React, { SFC } from 'react';
import Link from 'next/link';

import '../styles/Podcaster.css'

const TwitterImage:SFC<{ twitter?: string, name: string, id: string}> = ({ twitter, name, id }) => {
  if(twitter) {
    return <img className="avatar" 
      src={`/people/${id}/image`} 
      width="73" height="73" alt={`Twitter avatar von ${name}`}/>
  }
  return <img className="avatar" 
    src="https://resources.whatwg.org/logo.svg" 
    width="73" height="73" alt={`Kein Bild für ${name} verfügbar`}/>
}

const ConditionalLink:SFC<{ id: string, full?: boolean}> = ({ id, full = false, children}) => {
  if (full) {
    return <div className="card">{ children }</div>
  }
  return <Link as={`/podcaster/${id}`} href={`/podcaster?id=${id}`}>
    <a className="card">
      { children }
    </a>
  </Link>
}

export const Podcaster: SFC<{ person: Person, full?: boolean }> = ({ person, full = false }) => {
  return <ConditionalLink full={full} id={person.id}>
    <div className="podcaster-card">
      <TwitterImage twitter={person.twitter} name={person.name} id={person.id} />
      <div className="podcaster-group">
        <h3>{person.name}</h3>
        <p>
          Episoden: {person.episodes}
        </p>
      </div>
    </div>
  </ConditionalLink>
}
