import React, { Component } from 'react';
import { Podcaster } from '../components/Podcaster';
import Layout from '../components/Layout';

export default class PodcasterPage extends Component<{ person: Person, episodes: Episode[]}> {
  static async getInitialProps({ query, req }) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const resp = await fetch(`${baseUrl}/people/${query.id}`);
    return resp.json();
  }

  render() {
    const { person, episodes } = this.props;
    return <div className="accent">
      <Layout>
        <Podcaster full={true} person={person} />
        <div className="card">
          <h2>Episoden</h2>
          <ul className="episode-list">
            {episodes.map(el => <li>Revision {el.id}: <a href={el.href}>{el.title}</a></li>)}
          </ul>
        </div>
      </Layout>
    </div>
  }
}
