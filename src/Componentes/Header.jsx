import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { inputName }
        </p>
        <nav>
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
