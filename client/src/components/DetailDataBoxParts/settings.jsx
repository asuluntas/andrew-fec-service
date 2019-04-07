/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable class-methods-use-this */
import React from 'react';
import axios from 'axios';
import { DetailBoxRowTitle, DetailBoxRowItem } from './mainInfo.jsx';
import { GreenButton, GreyItem } from '../header.jsx';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreToggle: false,
      settingsMain: null,
      settingsMore: null,
    };
  }

  componentDidMount() {
    if (this.state.settingsMain === null) {
      this.getSettings();
    }
  }

  getSettings() {
    const { id } = this.props;
    axios.get(`/books/${id}/details/settings`)
      .then((res) => {
        const settingsArr = res.data;
        const { length } = settingsArr;
        const settingsMain = settingsArr.slice(0, 3);
        let settingsMore = settingsArr.slice(3, length);
        if (settingsMore.length === 0) {
          settingsMore = null;
        }

        this.setState({
          settingsMain,
          settingsMore,
        });
      })
      .catch(err => console.log('error get details', err));
  }

  generateSettingsLine(array) {
    const settingsSpanArray = [];

    array.forEach((setting, i) => {
      const { city, country } = setting;
      settingsSpanArray.push(
        <GreenButton key={i}>
          {`${city} `}
          <GreyItem>({country})</GreyItem>
          <br />
        </GreenButton>,
      );
    });

    return settingsSpanArray;
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({ moreToggle: !state.moreToggle }));
  }

  render() {
    const { settingsMain, settingsMore, moreToggle } = this.state;

    if (settingsMain === null) {
      return (null);
    }

    return (
      <div>
        <DetailBoxRowTitle>Settings</DetailBoxRowTitle>
        <DetailBoxRowItem>
          {this.generateSettingsLine(settingsMain)}
          {moreToggle && this.generateSettingsLine(settingsMore)}
          {
            settingsMore && (
              <GreenButton
                className="moreButton"
                onClick={(e) => { this.handleClick(e); }}
              >
                {moreToggle ? ' ...less' : ' ...more'}
              </GreenButton>
            )
          }
        </DetailBoxRowItem>
      </div>
    );
  }
}

export default Settings;
