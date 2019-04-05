import React from "react";
import Card from './movie/Card';
import Button from './core/Button';
import Api from './utils/Api';

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
    Api.getPopularMovies()
    .then(data => {
        this.setState({
          movies: data.results
        });
    console.info("@componentDidMount data", data.results)
    });
  };
  onclickFavoriteMovie(id) {
    console.info(id)
    const favorites = JSON.parse(localStorage.getItem("my-list"));   
    if (favorites !== null) {
      if (favorites.includes(id) === false) {
        favorites.push(id);
      }
      localStorage.setItem("my-list", JSON.stringify(favorites))
    } else {
      localStorage.setItem("my-list", JSON.stringify([id]))
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
      <div>
        <h4 className="text-center">Movies of the moment!</h4>
        <p className="popular-description">
          In this section you can choose between 2 movies of the moment. Just keep calm and make the good choice! (btw if you like neither of the movies you can skip)
        </p>
        <div className="row popular-section-cards">
          {currentMovies.map((movie) => {
            return(
              <Card
                key={movie.id}
                displayInfo
                {...movie}
                onClick={this.onclickFavoriteMovie} />
            );
          })}
        </div>        
          <div className="my-5 text-center">
            <Button className="btn btn-warning" onClick={this.onClickNextMovie}>Naah, Show me the next two movies</Button>
          </div>
      </div>
    );
  };


  render() {
    const { currentPage, movies, moviesPerPage } = this.state;
    const lastPage = Math.ceil(movies.length / moviesPerPage);
    return(
      <div className="container-fluid popular-main-section">

        {currentPage <= lastPage ? this.renderInGame() : this.renderEndGame() }

      </div>
    );
  };
};

export default Popular;