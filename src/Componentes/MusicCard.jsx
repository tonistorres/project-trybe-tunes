import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

// *****************************************
// Contribuição Qt07-09-10 - Gabriel Pinheiro //
// Implementação: Tonis Tores          //
// **************************************************************
// https://www.w3schools.com/tags/att_input_type_checkbox.asp //
// ********************************************************** //
export default class CardMusic extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      checked: false,
    };
    this.onChangeChecked = this.onChangeChecked.bind(this);
    this.onClickCheckedSaveLis = this.onClickCheckedSaveLis.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
    this.removeList = this.removeList.bind(this);
  }

  // ******************************//
  // Descrevendo a funcionalidade://
  // ****************************//
  // Documentação:https://pt-br.reactjs.org/docs/react-component.html#componentdidmount
  // Logo aós ser montado a página será invocado a comparação do array de musicas
  // com o arry de favorites e executado o checked na lista por meios do método
  // componentDidMount que tem no seu escopo uma chamada da função this.isFavorite
  // ******************************************************************************

  componentDidMount() {
    this.isFavorite();
  }

  async onClickCheckedSaveLis(objetc) {
    this.setState({ load: true },
      async () => {
        await addSong(objetc);
        this.setState({ load: false });
      });
  }

  onChangeChecked({ target }) {
    this.setState({ checked: target.checked }, () => {
      const { checked } = this.state;
      const { trackName, previewUrl, trackId } = this.props;
      if (checked) return this.onClickCheckedSaveLis({ trackName, previewUrl, trackId });
      return this.removeList({ trackName, previewUrl, trackId });
    });
  }

  // ******************************//
  // Descrevendo a funcionalidade://
  // ****************************//
  // Documentação:https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  // Testar se ao menos um dos elementos no arrFavorites passsa no teste
  // implementado pela função atribuída e retorna value TRUE ou FALSE
  // *********************************************************************************************************
  // Neste caso específico usamos uma HOF SOME para comparar se pelo menos um dos elementos contido dentro do
  // arrFavorites se correlaciona com o trackId recebido por props que é uma das propriedas do array onde contem
  // todas as músicas recebidas da API que foi tratadas com o [, ... rest] em album e agora sendo trabalhado somente
  // a propriedade trackId no comparativo do array de favorites com array de music
  isFavorite() {
    const { arrFavorites, trackId } = this.props;
    if (arrFavorites
      .some((favorite) => favorite.trackId === trackId)) {
      this.setState({ checked: true });
    }
  }

  async removeList(object) {
    this.setState({ load: true },
      async () => {
        await removeSong(object);
        this.setState({ load: false });
      });
  }

  // ******************************//
  // Descrevendo a Funcionalidade //
  // ****************************//
  // O método render fará toda rederização do nosso componente MusicCard.jsx.
  // Uma atualização pode ser causada por alterações em props ou no state
  // conforme explicita documentação:https://pt-br.reactjs.org/docs/react-component.html
  render() {
    const { trackName, previewUrl, trackId, eventHandler } = this.props;
    const { load, checked } = this.state;
    console.log('Checked no estado como tá?', checked);
    if (load) return <Loading />;
    return (
      <div className="Muisc-card-container-main">
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="checkbox-music">
          Favorita
          <input
            type="checkbox"
            id="checkbox-music"
            name="card-checked"
            checked={ checked }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.eventHandler }
            onChange={ this.onChangeChecked }
          />
        </label>
      </div>
    );
  }
}

CardMusic.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  eventHandler: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
  arrFavorites: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  })).isRequired,
};
