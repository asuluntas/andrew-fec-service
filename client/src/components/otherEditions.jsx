import React from 'react';
import axios from 'axios';
import { DetailBoxRowTitle, DetailBoxRowItem } from './mainInfo.jsx';
import { GreenButton, GreyItem } from './header.jsx';

class Editions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
    };
  }

  // getSettings() {
  //   const { id } = this.props;
  //   axios.get(`/books/${id}/details/editions`)
  //     .then((res) => {
  //       const settingsArr = res.data;
  //       const { length } = settingsArr;
  //       this.setState({
  //         settingsMain: settingsArr.slice(0, 3),
  //         settingsMore: settingsArr.slice(3, length),
  //       });
  //     })
  //     .catch(err => console.log('error get details', err));
  // }

  render() {

    return (
      <div>
        <DetailBoxRowTitle>Other Editions</DetailBoxRowTitle>
        <DetailBoxRowItem>Other Editions</DetailBoxRowItem>
      </div>
    );
  }
}

export default Editions;
