import React from "react";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.displayInfo = this.displayInfo.bind(this)
  }
  displayInfo() {
    const { title, vote_count, vote_average, overview } = this.props;
    return(    
      <div className="card-body">
        <h6 className="card-body-title">{title}</h6>
        <div className="card-body-vote">
        <p>
          {vote_count} votes - note: {vote_average}
        </p>

        </div>
        <div className="card-body-text overflow-auto">
          <p>{overview}</p>
        </div>
      </div>
    );
  };
  render() {
    const { onClick, title, backdrop_path, poster_path, id, displayInfo } = this.props;
    const imageVersion = (displayInfo === true ? backdrop_path : poster_path);
    const imagePath = "https://image.tmdb.org/t/p/w300/"
    return(
      <div className="movie-card">
        <div className="movie-card-top" onClick={() => {onClick(id)}}>
          <img className="movie-card-img" 
            src={imagePath + imageVersion}
            alt={`Cover of: ${title}`} />
        </div>        
          {displayInfo === true && this.displayInfo()} 
      </div>
    );
  };
};

export default Card;