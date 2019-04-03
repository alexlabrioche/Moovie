import React from "react";
import Card from "./movie/Card";

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movieIds : this.getFromLocalStorage()
    };
    this.onClickRemoveFavorite = this.onClickRemoveFavorite.bind(this)
  }
  getFromLocalStorage() {
    const movieIds = JSON.parse(localStorage.getItem("my-list"));
    // console.info("@MyList getFromlocalStorage IDs", movieIds)
    return movieIds
  } 
  componentDidMount() {
    const ID = this.state.movieIds;
    if (ID === null) {
      console.info("there's no favorite movie yet")
      return <p>no favorites</p>
    }
    // console.info("@MyList componentDidMount ID", ID);
    const API_KEY = "0f27f288355ac985ac3b6e61f7df20c3";
    Promise.all(ID.map((movie) => {
      return fetch(`http://api.themoviedb.org/3/movie/${movie}?api_key=${API_KEY}`)
        .then(res => res.json())
    })).then((movies) => {
      // console.info(movies);
      this.setState({
        movies
      })
    });
  };

  onClickRemoveFavorite(id) {
    // console.info("onClick movieIds",this.state.movieIds);
    // console.info("ID to delete",id);
    const movies = this.state.movies;
    const localStorageMovies = this.state.movieIds;
    console.info(">> movies", movies);
    movies.map((movie, index) => {
      // console.info(index)
      // console.info("movie ID", movie.id)
      movie.id === id && movies.splice(index, 1)
      movie.id === id && localStorageMovies.splice(index, 1)
    })
    localStorage.setItem("my-list", JSON.stringify(localStorageMovies))
    // console.info(">> movies", movies);
    this.setState({
      movies
    })
  }

  render() {
    console.info("@MyList moviesIds", this.state.movieIds)
    console.info("@MyList movies", this.state.movies)
    return(
      <div className="container-fluid mt-5">
        <div className="row">
        {this.state.movies.map((movie, index) => {
            return(
              <div className="col-4 mb-5" key={index}>
              <Card movie={movie} onClick={this.onClickRemoveFavorite} />
            </div>
            )
          })}
        </div>
      </div>
    );
  };
};

export default MyList;