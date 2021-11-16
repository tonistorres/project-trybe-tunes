import React, { Component } from 'react';
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

  // logo após renderizar minha aplicação vou utilizar a função espcial
  // com componentDidMount() para executar a lógica de buscar uma dada pessoa
  // na api

  // eslint-disable-next-line react/sort-comp
  async getUserName() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ loading: true },
      async () => {
        const request = await getUser();
        const { name } = request;
        // eslint-disable-next-line react/no-unused-state
        this.setState({ loading: false, inputName: name });
      });
  }

  // eslint-disable-next-line space-before-blocks
  componentDidMount(){
    this.getUserName();
  }

  render() {
    const { loading, inputName } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { inputName }
        </p>
      </header>
    );
  }
}
