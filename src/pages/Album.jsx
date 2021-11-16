import React, { Component } from 'react';
import Header from '../Componentes/Header';

class Album extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { match: { params: { id } } } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>{id}</h1>
      </div>
    );
  }
}

export default Album;
