import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ResultPesquisa extends Component {
  render() {
    const { arrAlbums, artist } = this.props;
    console.log(arrAlbums);
    return (
      <section className="App-style-Resultado">
        <h2>
          {`Resultado de álbuns de: ${artist}`}
        </h2>
        {arrAlbums.map((colectionMusic, index) => (
          <div key={ index }>
            <img src={ colectionMusic.artworkUrl100 } alt="Coletânea de Musica" />
            <h2>Album</h2>
            <span>{ colectionMusic.collectionName }</span>
            <span>Artista</span>
            <span>{ colectionMusic.artistName }</span>
            <Link
              data-testid={ `link-to-album-${colectionMusic.collectionId}` }
              to={ `/album/${colectionMusic.collectionId}` }
            >
              Link
            </Link>
          </div>
        ))}
      </section>
    );
  }
}
ResultPesquisa.propTypes = {
  arrAlbums: PropTypes.array,
  artist: PropTypes.string,
}.isRequired;
