import React from "react";

class Card extends React.Component {
  render() {
    const { onClick, title, poster, id, voteCount, voteAverage } = this.props
    // console.info("@card id", movie.id)
    return(
      <button className="btn" onClick={() => {onClick(id)}}>
        <div>
          <div className="card">
            <img className="card-img-top" src={`https://image.tmdb.org/t/p/w300/${poster}`} alt={`Cover of: ${title}`} />
            <div className="card-body">
              <h6 className="card-title">{title}</h6>
              <p>{voteCount} votes</p>
              <p>note: {voteAverage}</p>
            </div>
          </div>
        </div>
      </button>
    );
  };
};

export default Card;