import React, { Component } from 'react';
import Header from '../Componentes/Header';

class Album extends Component {
  render() {
    const { match } = props;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>{match.id}</h1>
      </div>
    );
  }
}

export default Album;
