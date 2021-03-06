import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import user from '../assets/user.jpg';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      inputName: '',
    };

    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }
  // logo após renderizar minha aplicação vou utilizar a função espcial
  // com componentDidMount() para executar a lógica de buscar uma dada pessoa
  // na api

  async getUserName() {
    this.setState({ loading: true },
      async () => {
        const request = await getUser();
        const { name } = request;
        this.setState({ loading: false, inputName: name });
      });
  }

  render() {
    const { loading, inputName } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component" className="App-style-head">
        <div className="App-style-name-user">
          <p data-testid="header-user-name" className="styl-img-name-login">
            <img className="img-login-personalize" src={ user } alt="logo user" />
            { inputName }
          </p>
        </div>
        <nav className="App-style-nav-links">
          <Link to="/"> Login </Link>
          {/* Link redireciona para a pagina de pesquisa  */ }
          <Link to="/search" data-testid="link-to-search"> Search </Link>
          {/* Link redireciona para a pagina de musicas  */ }
          <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
          {/* Link redireciona para a pagina de exibição de perfil  */ }
          <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        </nav>
      </header>
    );
  }
}
