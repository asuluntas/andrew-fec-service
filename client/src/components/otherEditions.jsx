import React from 'react';
import axios from 'axios';
import { DetailBoxRowTitle, DetailBoxRowItem } from './mainInfo.jsx';
import { GreenButton, GreyItem } from './header.jsx';

class Editions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editionsMain: null,
      editionsMore: null,
    };
  }

  componentDidMount() {
    this.getEditions();
  }

  getEditions() {
    const { id } = this.props;
    axios.get(`/books/${id}/details/editions`)
      .then((res) => {
        const editionsArr = res.data;
        const { length } = editionsArr;
        const editionsMain = editionsArr.slice(0, 5);
        let editionsMore = editionsArr.slice(5, length);
        if (editionsMore.length === 0) {
          editionsMore = null;
        }
        this.setState({
          editionsMain,
          editionsMore,
        });
      })
      .catch(err => console.log('error get details', err));
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <DetailBoxRowTitle>Other Editions</DetailBoxRowTitle>
        <DetailBoxRowItem>Other Editions</DetailBoxRowItem>
      </div>
    );
  }
}

export default Editions;
