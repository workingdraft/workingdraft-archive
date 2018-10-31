import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Podcaster } from '../components/Podcaster';

export default class Index extends Component {
  static async getInitialProps({ req }) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const resp = await fetch(`${baseUrl}/people`);
    return resp.json();
  }

  render() {
    const { team, alumni, guests } = (this.props as PeopleProps);
    return <Layout>
      <h1>Archiv</h1>
      <h2>Team</h2>
      <div className="list">
        {team.map(el => <Podcaster person={el[1]} />)}
      </div>
      <h2>Alumni</h2>
      <div className="list">
        {alumni.map(el => <Podcaster person={el[1]} />)}
      </div>
      <h2>Gäste</h2>
      <div className="list">
        {guests.map(el => <Podcaster person={el[1]} />)}
      </div>
    </Layout>
  }
}
