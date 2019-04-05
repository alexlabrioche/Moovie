import React from "react";
import Card from "./movie/Card";
import Api from "./utils/Api";

// const API_KEY = "0f27f288355ac985ac3b6e61f7df20c3";

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movieIds : this.getFromLocalStorage()
    };
    this.onClickRemoveFavorite = this.onClickRemoveFavorite.bind(this)
  };
  getFromLocalStorage() {
    const movieIds = JSON.parse(localStorage.getItem("my-list"));
    return movieIds
  };

  componentDidMount() {
    const { movieIds } = this.state;
    if (movieIds === null) {
      console.info("there's no favorite movie yet");
    };
    Promise.all(movieIds.map(id => Api.getMovie(id)))
      .then((movies) => {
        this.setState({
          movies
        });
      });
  };

  onClickRemoveFavorite(id) {
    const movies = this.state.movies;
    const localStorageMovies = this.state.movieIds;
    movies.forEach((movie, index) => {
      movie.id === id 
        && movies.splice(index, 1) 
        && localStorageMovies.splice(index, 1);
    });
    localStorage.setItem("my-list", JSON.stringify(localStorageMovies))
    this.setState({
      movies
    });
  };

  render() {
    // console.info("@MyList moviesIds", this.state.movieIds)
    // console.info("@MyList movies", this.state.movies)
    return(
      <div className="container-fluid mt-5">
        <div className="row">
        {this.state.movies.map((movie, index) => {
            return(
              <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-5" key={index}>
              <Card 
                {...movie}
                onClick={this.onClickRemoveFavorite} />
            </div>
            )
          })}
        </div>
      </div>
    );
  };
};

export default MyList;