import moment from 'moment';
const TODAY = moment().format("YYYY-MM-DD");
const NEXT_WEEK = moment().add(7, 'days').format("YYYY-MM-DD");
const API_KEY = "0f27f288355ac985ac3b6e61f7df20c3";
const popularMoviesUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

class Api {
  getPopularMovies() {
    return fetch(popularMoviesUrl)
      .then(res => res.json());
  };
  getLatestMovies(page) {
    console.info("in Api", page)
    const url = `http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${TODAY}&primary_release_date.lte=${NEXT_WEEK}&page=${page}&api_key=${API_KEY}`;
    return fetch(url)
    .then(res => res.json())
    .then(data => data.results);
  };
  getMovie(movie) {
    console.info(movie)
    return fetch(`http://api.themoviedb.org/3/movie/${movie}?api_key=${API_KEY}`)
    .then(res => res.json());
  };
};

export default new Api(); 