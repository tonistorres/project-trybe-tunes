import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Componentes/Header';
import MusicCard from '../Componentes/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../index.css';
import Loading from '../Componentes/Loading';

// *****************************************
// Contribuição Qt07-09-10 - Gabriel Pinheiro //
// Implementação: Tonis Tores          //
// **************************************************************
// https://www.w3schools.com/tags/att_input_type_checkbox.asp //
// ********************************************************** //
class Album extends Component {
  constructor() {
    super();
    this.state = {
      arrayOfMusic: [],
      arrFavorites: [],
      artist: '',
      colection: '',
      load: false,
    };

    // *******************************************************
    // Com essa duas linhas meio obscuras fazemos um
    // relacionamento entre as funções abiaxo descrita
    // com o this, fazndo com que elas passem a enxergar
    // o this a paritir do constructor e dados a elas a
    // possibilidade de manipular de dentro do  seus escopo
    // o estado do componente.
    // ******************************************************
    this.getMusicSinger = this.getMusicSinger.bind(this);
    this.getFavoriteMusics = this.getFavoriteMusics.bind(this);
  }

  // ******************************//
  // Descrevendo a funcionalidade://
  // ****************************//
  // Documentação:https://pt-br.reactjs.org/docs/react-component.html#componentdidmount
  // Logo aós ser montado a página será invocado duas funções: a getMusicSinger()
  // e a getFavoriteMusics()
  // ******************************************************************************
  componentDidMount() {
    this.getMusicSinger();
    this.getFavoriteMusics();
  }

  // ************************************************************
  // Qt-07 - Fazer uma requisição utilizando a função getMusics //
  // ************************************************************
  // Descrever a Função: A função getMusicSinger() é uma função
  // assíncrona, por isso a utilização das partículas async e
  // await fazendo parte do escopo da função. Para passar o parâmtro
  // desejado pela função getMuisc(id) passaremos o id por meio de
  // props no caso do objeto props do Route que é um objeto que em sua
  // estrutura temos a chave match e logo em seguida a chave params.
  // Passado o id para a função receberemos como retorno um array
  // com albuns de muisacas filtrados por id.
  // Em seguida utilizamos a função setState para setar os valores
  // as propriedades do nosso estado onde receberão valores vindo da
  // Api.
  // *****************************************************************
  async getMusicSinger() {
    const { match: { params: { id } } } = this.props;
    const dataGetMusic = await getMusics(id);
    console.log('O que retorna getMusics(id):', dataGetMusic);
    this.setState(
      { arrayOfMusic: dataGetMusic,
        artist: dataGetMusic[0].artistName,
        colection: dataGetMusic[0].collectionName,
      },
    );
  }

  // ok getFavoriteMusics😀
  async getFavoriteMusics() {
    this.setState({ load: true },
      async () => {
        const datarrFavorites = await getFavoriteSongs();
        this.setState({ load: false, arrFavorites: datarrFavorites });
      });
  }

  render() {
    const { artist, colection, arrayOfMusic, load, arrFavorites } = this.state;
    const [, ...rest] = arrayOfMusic; // , tira o primeiro elemento do array espalhando propriedades no array
    if (load) return <Loading />;
    return (
      <div data-testid="page-album" className="container-main-muiscard">
        <Header />
        <p data-testid="artist-name">{ artist }</p>
        <p data-testid="album-name">{ colection }</p>
        <div>
          {rest.map(({ trackName, previewUrl, trackId }) => (
            <MusicCard
              key={ trackId }
              trackId={ trackId }
              trackName={ trackName }
              previewUrl={ previewUrl }
              arrFavorites={ arrFavorites }
              artist={ artist }
              colection={ colection }
            />
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
