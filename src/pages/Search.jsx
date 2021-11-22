import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../Componentes/Header';
import Loading from '../Componentes/Loading';
import ResultPesquisa from '../Componentes/ResultPesquisa';
import '../Componentes/personalizacao.css';

// constante criada para ser utilizada na estrutrua condiconal
// if para controlar a quantidade de caracter que está sendo digitado
// no campo nome
const NUBER_MAX_CARACTER = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isButtonDisabled: true,
      load: false,
      arrAlbums: [],
      artist: '',

    };
    this.handleClick = this.handleClick.bind(this);
  }

  // *******************************************************************************************
  // Função handleClick é uma função que se utiliza de assincronismo a principal funcionalidade
  // é fazer uma requisição à uma API que trará um array de objetos contendo albuns de   música
  // de um determinado cantor dependendo do nome passado para o mesmo.
  // ela é envolta por um this.Setstate que é uma função assincrona ou que tem essa caracteristica
  // de trabalhar como uma função assincrona por baixo dos panos, onde a primeira modificação (rendereização)
  // que ela irá executar é executar o load do carregamento caso seu estado esteja true(verdadeiro)
  // em seguida é feito uma desconstrução do inputName que será utilizado apra passar como parâmentro para
  // a função searchAlbumsAPI o retorno é um array de obejtos que será atribuido a returnAlbum

  async handleClick() {
    this.setState({ load: true }, async () => {
      const { inputName } = this.state;
      const returnAlbum = await searchAlbumsAPI(inputName);
      // após a execução da função searchAmbumsAPI() é modificado o estado novamente para load:false
      this.setState({ load: false });
      // Nesse ponto temos um teste condicional que faz a seguinte verificação
      // se a const returnAmbum que foi atribuída for maior que zero, ou seja, contenha algo nela
      // mude o valor da chave do componente no state para os valores abaixo setados.
      // caso contrário arrAlbums receber um array vazio e artist recebe vazio
      if (returnAlbum.length > 0) {
        this.setState({
          arrAlbums: returnAlbum,
          artist: inputName,
          inputName: '',
        });
      } else {
        this.setState({ arrAlbums: [], artist: '' });
      }
    });
  }

  // ***************************************************************************************** *
  // bem a fução abaixo explicitada não foi preciso fazer o bind dela dentro do constructor
  // devido ela ser uma arrow function, uma arrow function não precisa ser relacionada com um
  // bind no constructor e arrow function tem uma lógica interna que o this pode ser visto a
  // partir dela. À unica diferenção entre a função referenciada pelo bind e a arrow function
  // é em questão de perfomace, porém, é algo tão insginificante para esse cenário que é opcional
  // escolher como declarar a função aqui.
  // ********************************************************************************************
  // Funcionalidade:validationDataInput está referenciada ao evento onChange do campo Nome User
  // no momento que for digitado algo no campo irá executar esse função automaticamente.
  // na função desconstruimos event e pegando a chave que nos interessa nesse caso o target
  // logo em seguida desconstruímos traget pegando as chaves name, value que serão utilizada
  // na nossa lógica de desabilitar o botão quando for digitado menos de três caracter em nosso
  // campo.

  validateInput = ({ target }) => {
    const { name, value } = target;
    // se o numero de caracter digitado for maior que o número contido na constante
    // NUBER_MAX_CARACTER desabilite o botão, caso contrário habilite o botão
    if (value.length >= NUBER_MAX_CARACTER) {
      this.setState({ [name]: value, isButtonDisabled: false });
    } else {
      this.setState({ [name]: value, isButtonDisabled: true });
    }
  }

  render() {
    const { inputName, isButtonDisabled, load, arrAlbums, artist } = this.state;
    if (load) return <Loading />;
    return (
      <div data-testid="page-search" className="App-style-container-forms">
        <Header />
        <form className="App-form-container">
          <input
            className="input-style-search"
            placeholder="🤖 Pesquisar por Artista"
            data-testid="search-artist-input"
            type="text"
            name="inputName"
            value={ inputName }
            onChange={ this.validateInput }
          />

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        <section className="container-main-search">
          {
            arrAlbums.length > 0
              ? <ResultPesquisa arrAlbums={ arrAlbums } artist={ artist } />
              : <p className="result-nenhum-album-encon">Nenhum álbum foi encontrado</p>
          }
        </section>
      </div>
    );
  }
}

export default Search;
