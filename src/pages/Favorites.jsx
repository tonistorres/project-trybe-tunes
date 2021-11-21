import React, { Component } from 'react';
import Loading from '../Componentes/Loading';
import MusicCard from '../Componentes/MusicCard';
import Header from '../Componentes/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

// *****************************************
// Contribuição Qt07-09-10 - Gabriel Pinheiro //
// Implementação: Tonis Tores          //
// **************************************************************
// https://www.w3schools.com/tags/att_input_type_checkbox.asp //
// ********************************************************** //
export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      arrFavorites: [],
    };
    this.getFavoriteMusics = this.getFavoriteMusics.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
  }

  componentDidMount() {
    this.getFavoriteMusics();
  }

  async getFavoriteMusics() {
    this.setState({ load: true },
      async () => {
        const request = await getFavoriteSongs();
        this.setState({ load: false, arrFavorites: request });
      });
  }

  async removeSongOnList(obj) {
    this.setState({ load: true },
      async () => {
        await removeSong(obj);
        this.setState({ load: false });
      });
  }

  eventHandler({ target }) {
    const { arrFavorites } = this.state;
    const objToDelete = arrFavorites
      .find((favorite) => favorite.trackId === Number(target.id));
    this.removeSongOnList(objToDelete);
    this.getFavoriteMusics();
  }

  render() {
    const { load, arrFavorites } = this.state;
    if (load) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          arrFavorites
            .map((favorite) => (
              <MusicCard
                eventHandler={ this.eventHandler }
                key={ favorite.trackId }
                { ...favorite }
                arrFavorites={ arrFavorites }
              />))
        }
      </div>
    );
  }
}
