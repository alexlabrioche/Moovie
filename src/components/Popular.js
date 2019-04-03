import React from "react";
import Card from './movie/Card';

import Button from './core/Button'

const API_KEY = "0f27f288355ac985ac3b6e61f7df20c3";
const URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=";

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      currentPage: 1,
      moviesPerPage: 2,
    };
    this.onclickFavoriteMovie = this.onclickFavoriteMovie.bind(this);
    this.onClickNextMovie = this.onClickNextMovie.bind(this);
    this.renderInGame = this.renderInGame.bind(this);
    this.renderEndGame = this.renderEndGame.bind(this);
  };
  componentDidMount() {
    fetch(URL + API_KEY)
    .then(res => res.json())
    .then(data => {
      if (data.results !== undefined) {
        this.setState({
          movies: data.results
        });
      };
    // console.info("@componentDidMount data", data.results)
    });
  };
  onclickFavoriteMovie(id) {
    const favorites = JSON.parse(localStorage.getItem("my-list"));
    const movieId = id;
    if (favorites !== null) {
      favorites.push(movieId);
      localStorage.setItem("my-list", JSON.stringify(favorites))
    } else {
      localStorage.setItem("my-list", JSON.stringify([movieId]))
    }
    let currentPage = this.state.currentPage + 1;
    this.setState({
      currentPage,

    });
  };

  onClickNextMovie() {
    let currentPage = this.state.currentPage + 1;
    this.setState({
      currentPage,
    });
  };

  clearLocalStorage() {
    console.info('@clearLocalStorage');
    const myList = localStorage.getItem("my-list");
    console.info("@clearLocalStorage myList", myList);
    localStorage.clear();
    console.info("@clearLocalStorage myList", myList);
  };

  renderEndGame() {
    return(
      <div className="popular-section__end text-center">
        <h4>Alright!</h4>
        <p>You add all movies from this week selection. You can find them in the My List section</p>
      </div>
    );
  };

  renderInGame() {
    const { movies, currentPage, moviesPerPage } = this.state;
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    const myList = localStorage.getItem("my-list");
    console.info("@Popular myList", myList);
    return(
      <div className="row">
        <div className="col-12">
          <p>In this Section you can add into your list from a selection of recent movies. If you don't like just skip to the next 2 movies</p>
          <h6 className="text-center">Updated weekly!</h6>
        </div>
          {currentMovies.map((movie, index) => {
            return(
              <div className="col-6 mb-5" key={index}>
                <Card 
                  title={movie.title} 
                  poster={movie.poster_path}
                  id={movie.id}
                  voteCount={movie.vote_count}
                  voteAverage={movie.vote_average}
                  onClick={this.onclickFavoriteMovie} />
              </div>
            );
          })}
          <div className="col-12">
            <div className="mb-5 text-center">
              <Button className="btn btn-warning" onClick={this.onClickNextMovie}>Naah, Show me the next two movies</Button>
            </div>
          </div>
      </div>
    );
  };


  render() {
    const { currentPage } = this.state;
    return(
      <div className="container-fluid popular-section">

        {currentPage > 10 ? this.renderEndGame() : this.renderInGame()}

        <div className="mb-5 text-center">
          <Button className="btn btn-danger" onClick={this.clearLocalStorage}>Clear localStorage</Button>
        </div>

      </div>
    );
  };
};

export default Popular;