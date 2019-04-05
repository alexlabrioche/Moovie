import React from "react";
import Api from "./utils/Api";
import Card from './movie/Card';
import Button from './core/Button';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      movies: [],
      currentPage: 1,
    });
    this.onclickDiscoverFavoriteMovie = this.onclickDiscoverFavoriteMovie.bind(this);
    this.onClickNextPage = this.onClickNextPage.bind(this);
  };
  componentDidMount() {
    const { currentPage } = this.state;
    console.info("ComponentDidMount currentPage", currentPage)
    console.info("ComponentDidMount Api", Api)
    Api.getLatestMovies(currentPage)
    .then(movies => {
      this.setState({
        movies,
      });
    });
  };
  onclickDiscoverFavoriteMovie(id) {
    console.info(id)
    const { movies } = this.state;
    const favorites = JSON.parse(localStorage.getItem("my-list"));   
    if (favorites !== null) {
      if (favorites.includes(id) === false) {
        favorites.push(id);
      };
      localStorage.setItem("my-list", JSON.stringify(favorites))
    } else {
      localStorage.setItem("my-list", JSON.stringify([id]))
    };
    movies.forEach(movie => {
      return movie.id === id && movies.splice(movie, 1);
      }
    );
    console.info(movies)
    this.setState({
      movies
    })
  };
  onClickNextPage() {
    console.info("heeere")
    let currentPage = this.state.currentPage + 1;
    console.info(currentPage)
    // this.setState({
    //   currentPage,
    // });
    Api.getLatestMovies(currentPage)
      .then(movies => this.setState({ movies }));
  };

render() {
  const { movies } = this.state;
  return(
    <div className="container-fluid popular-main-section">
      <div className="row popular-section-cards">
        {movies.map((movie => {
          return <Card
            key={movie.id}
            {...movie}
            onClick={this.onclickDiscoverFavoriteMovie} />
        }))}
      </div>
      <div className="my-5 text-center">
        <Button 
          className="btn btn-warning" 
          onClick={this.onClickNextPage}>
          {movies.length === 0 ? "Not enough likes? go next" : "Nothing crazy here, show me the next"}
        </Button>
      </div>
    </div>
  );
};
};

export default Discover;