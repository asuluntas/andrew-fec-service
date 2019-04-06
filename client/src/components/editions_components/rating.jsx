import React from 'react';
import StarRatings from 'react-star-ratings';

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };
  }

  changeRating(newRating, name) {
    this.setState({
      rating: newRating,
    });
  }

  render() {
    return (
      <StarRatings
        // eslint-disable-next-line react/destructuring-assignment
        rating={this.state.rating}
        starEmptyColor="rgb(203, 211, 227)"
        starHoverColor="rgb(245, 166, 35)"
        starRatedColor="blue"
        starDimension="15px"
        starSpacing="0px"
        changeRating={this.changeRating}
        numberOfStars={5}
        name="rating"
      />
    );
  }
}

export default Stars;
