import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Results.css';
import './personalizacao.css';

export default class ResultPesquisa extends Component {
  render() {
    const { arrAlbums, artist } = this.props;
    return (
      <section className="container-main-results">
        <div className="container-albuns-head">
          <h2>
            { `Resultado de álbuns de: ${artist}`}
          </h2>
        </div>
        <div className="container-cards-body">
          {arrAlbums.map((colectionMusic, index) => (
            <div key={ index }>
              <div className="Result-cart-album">
                <img
                  src={ colectionMusic.artworkUrl100 }
                  alt="Coletânea de Musica"
                />
                <h2>
                  <span
                    data-testid="artist-name"
                    className="result-style-collection"
                  >
                    Artista :
                    { colectionMusic.artistName }
                  </span>
                </h2>
                <span
                  data-testid="album-name"
                  className="result-style-collection"
                >
                  { colectionMusic.collectionName }
                </span>
                <Link
                  data-testid={ `link-to-album-${colectionMusic.collectionId}` }
                  to={ `/album/${colectionMusic.collectionId}` }
                >
                  Link
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>
    );
  }
}
ResultPesquisa.propTypes = {
  arrAlbums: PropTypes.array,
  artist: PropTypes.string,
}.isRequired;
