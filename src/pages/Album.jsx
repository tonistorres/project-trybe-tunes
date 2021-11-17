import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Componentes/Header';
import CardMusic from '../Componentes/CardMusic';
import getMusics from '../services/musicsAPI';
// *****************************************
// Contribuição Qt07 - Gabriel Pinheiro //
// Implementação: Tonis Tores          //
// ***********************************//
class Album extends Component {
  constructor() {
    super();
    this.state = {
      arrayOfMusic: [],
      singer: '',
      listMusic: '',
    };
    this.getMusicSinger = this.getMusicSinger.bind(this);
  }

  componentDidMount() {
    this.getMusicSinger();
  }

  async getMusicSinger() {
    const { match: { params: { id } } } = this.props;
    const retrunResponse = await getMusics(id);
    this.setState(
      { arrayOfMusic: retrunResponse,
        singer: retrunResponse[0].artistName,
        listMusic: retrunResponse[0].collectionName,
      },
    );
  }

  render() {
    const { singer, listMusic, arrayOfMusic } = this.state;
    const [, ...rest] = arrayOfMusic; // , tira o primeiro elemento do array
    return (
      <div data-testid="page-album">
        <Header />
        <span data-testid="artist-name">{ singer }</span>
        <span data-testid="album-name">{ listMusic }</span>
        <div>
          {rest.map((music, index) => (
            <CardMusic key={ index } { ...music } /> // mudar a chave
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
