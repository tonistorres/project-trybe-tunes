import React, { Component } from 'react';
import Header from '../Componentes/Header';
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
    };
    this.validateInput = this.validateInput.bind(this);
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
    const { isButtonDisabled, inputName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            placeholder="Pesquisar Artista"
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
