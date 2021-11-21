import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../index.css';
import './personalizacao.css';

export default class ResultPesquisa extends Component {
  render() {
    const { arrAlbums, artist } = this.props;
    console.log('Array Resultado Pesquisa:', arrAlbums);
    return (
      <section>
        <header className="App-style-cabecalho-result">
          <h2>
            {`Resultado de álbuns de: ${artist}`}
          </h2>
        </header>
        <div className="Resul-style-pesquisa">
          {arrAlbums.map((colectionMusic, index) => (
            <div key={ index }>
              <div className="Result-cart-album">
                <img
                  src={ colectionMusic.artworkUrl100 }
                  alt="Coletânea de Musica"
                />
                <h2>
                  Album
                  {index + 1}
                </h2>
                <span>{ colectionMusic.collectionName }</span>
                <span>
                  Artista
                  { colectionMusic.artistName }
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
