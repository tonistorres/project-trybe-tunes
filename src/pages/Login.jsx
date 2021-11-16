import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Componentes/Loading';
import { createUser } from '../services/userAPI';
// constante criada para ser utilizada na estrutrua condiconal
// if para controlar a quantidade de caracter que está sendo digitado
// no campo nome
const NUBER_MAX_CARACTER = 3;

class Login extends Component {
  // aqui temos uma das principais função interna do react
  // o constructor que pode ser extendido a partir do momento que invocarmos
  // à função super() que nos permite colocar a nossa lógica
  // dentro desta função(constructor). É a primeira função carregada dentro da classe,
  // e é rodada uma unica vez no momento da criação do componente. Excelente lugra para
  // guardarmos o estado da nossa aplicação.
  constructor() {
    super();
    // aqui onde fica o estado da nossa aplicação
    this.state = {
      inputName: '',
      isButtonDisabled: true,
      // eslint-disable-next-line react/no-unused-state
      load: false,
      // eslint-disable-next-line react/no-unused-state
      redirect: false,
    };
    // aqui estamos fazemos uma relação entre o this com a função saveUser()
    // com essa linha de código um tanto quanto obscura o this passa a ser
    // visto dentro da nossa função saveUser nos permitindo dessa forma acessar
    // nosso estado a paritr da função hora referenciada
    this.saveUser = this.saveUser.bind(this);
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

  validationDataInput = ({ target }) => {
    const { name, value } = target;
    // se o numero de caracter digitado for maior que o número contido na constante
    // NUBER_MAX_CARACTER desabilite o botão, caso contrário habilite o botão
    if (value.length >= NUBER_MAX_CARACTER) {
      this.setState({ [name]: value, isButtonDisabled: false });
    } else {
      this.setState({ [name]: value, isButtonDisabled: true });
    }
  }

  async saveUser() {
    this.setState(
      { load: true },
      async () => {
        const { inputName } = this.state;
        await createUser({ name: inputName });
        this.setState(
          { load: false, redirect: true },
        );
      },
    );
  }

  render() {
    const { inputName, isButtonDisabled, load, redirect } = this.state;

    if (redirect) return <Redirect to="/search" />;
    if (load) return <Loading />;
    return (
      <div data-testid="page-login">
        <label htmlFor="input-name">
          Nome:
          <input
            name="inputName"
            type="text"
            id="input-name"
            data-testid="login-name-input"
            value={ inputName }
            onChange={ this.validationDataInput }
          />
        </label>

        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isButtonDisabled }
          onClick={ this.saveUser }
        >
          Entrar
        </button>

      </div>
    );
  }
}

export default Login;
