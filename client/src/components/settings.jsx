import React from 'react';
import axios from 'axios';
import { DetailBoxRowTitle, DetailBoxRowItem } from './mainInfo.jsx';
import { GreenButton } from './header.jsx';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreToggle: false,
      settingsMain: null,
      settingsMore: null,
    };
  }

  render() {
    return (
      <div>
        <DetailBoxRowTitle>Settings</DetailBoxRowTitle>
        <DetailBoxRowItem>Settings</DetailBoxRowItem>
      </div>
    );
  }
}

export default Settings;
