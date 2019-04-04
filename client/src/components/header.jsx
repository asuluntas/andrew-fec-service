/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import DetailDataBox from './detailDataBox.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreToggle: false,
      id: (this.props.match.params.id),
      details: null,
    };
  }

  componentDidMount() {
    if (this.state.details === null) {
      this.getMainDetails();
    }
  }

  getMainDetails() {
    const { id } = this.state;
    axios.get(`/books/${id}/details`)
      .then((res) => {
        this.setState({
          details: res.data,
        });
      })
      .catch(err => console.log('error get details', err));
  }

  header() {
    const {
      type, pagenum, originalPubDate, firstPubDate, publisher,
    } = this.state.details;
    const typeAndPageNumberLine = `${type}, ${pagenum} pages`;
    const publishInfoLine = `Published ${originalPubDate} by ${publisher} (first published ${firstPubDate})`;

    return (
      <div>
        <div>{typeAndPageNumberLine}</div>
        <div>{publishInfoLine}</div>
      </div>
    );
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({ moreToggle: !state.moreToggle }));
  }

  render() {
    console.log(this.state);

    if (!this.state.details) {
      return (<div />);
    }
    const { moreToggle } = this.state;
    return (
      <div>
        {this.header()}

        {moreToggle ? (<DetailDataBox details={this.state.details} />) : null}

        <div>
          <span onClick={(e) => { this.handleClick(e); }}>{moreToggle ? '...Less Detail' : 'More Details...'}</span>
          <span>edit details</span>
        </div>


      </div>
    );
  }
}

export default Header;
