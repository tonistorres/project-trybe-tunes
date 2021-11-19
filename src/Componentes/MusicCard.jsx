import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';
// https://www.w3schools.com/tags/att_input_type_checkbox.asp
export default class CardMusic extends Component {
  constructor(props) {
    super(props);
    // para iniciar o estado temos inicialmente um load que
    // tem por funcionalidade efetuar o controle de quando
    // de quando o componente Load entra e sai de cena. funciona
    // como uma flag de controle. Em nosso caso que será cotrolada
    // aqui no estado do componente MusicCard. Não obstante temos
    // também uma propriedade checked que fará o controle de quando
    // o campo tá checado ou nao, seguindo a mesma dinâmica do load.
    this.state = {
      load: false,
      checked: false,

    };
    // Aqui temos o bind fazendo com que o this possa ser visto
    // detro da função onClickChecked permitidos que a mesma possa
    // fazer acesso ao estado do componente o que faz todo sentido
    this.onChangeChecked = this.onChangeChecked.bind(this);
  }

  // componentDidMount() {
  //   this.toRecoverFavorite();
  // }

  // cria a função logo abaixo toRecoverFavorite();

  // Essa função desconstroi o objeto event a chave target pegando o valor contido
  // no componente que esse objeto referencia no nosso caso um campo do tipo input
  // do tipo checked. Em nosso caso o value aqui passa o id da música capturado por
  // por meio de propos a partir de componente Album.jsx.
  // Essa funão é invocada a partir de um elemento onClick onde recebe o value que é o
  // trackId e logo em seguida modifica o estado de false para true e executa o evento
  // de carregamento no render, modifica o estado do botão checked na propriedade defaultChecked
  // que é um propriedade do HTML que dependendo do boolean setado pde alterar o compostamento do
  // checked: ex.: se true o a caixa de seleção fica checada caso contrário fica limpa.
  // logo em seguida é feito uma requisição ao método assincrono addSong passando o value (trackId) como
  // parâmetro e o estado do carregamento load é setado como false terminando a rederização da barra load.
  async onClickChecked(objetc) {
    this.setState({ load: true },
      async () => {
        await addSong(objetc);
        this.setState({ load: false });
      });
  }

  onChangeChecked({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  // O método render fará toda rederização do nosso componente MusicCard.jsx.
  // Uma atualização pode ser causada por alterações em props ou no state
  // conforme explicita documentação:https://pt-br.reactjs.org/docs/react-component.html
  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { load, checked } = this.state;
    if (load) return <Loading />;
    return (
      <div>
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
            name="checked"
            value={ checked }
            defaultChecked={ checked }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ () => this.onClickChecked({ trackName, previewUrl, trackId }) }
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
  trackId: PropTypes.number.isRequired,
};
