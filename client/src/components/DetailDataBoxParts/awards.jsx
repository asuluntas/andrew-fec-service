/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
import React from 'react';
import axios from 'axios';
import { DetailBoxRowTitle, DetailBoxRowItem } from './mainInfo.jsx';
import { GreenButton } from '../header.jsx';

class Awards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreToggle: false,
      awardsMain: null,
      awardsMore: null,
    };
  }

  componentDidMount() {
    if (this.state.awardsMain === null) {
      this.getAwards();
    }
  }

  getAwards() {
    const { id } = this.props;
    axios.get(`/books/${id}/details/awards`)
      .then((res) => {
        const allAwardsArr = this.generateAwardsMainAndMore(res.data);
        this.setState({
          awardsMain: allAwardsArr[0],
          awardsMore: allAwardsArr[1],
        });
      })
      .catch(err => console.log('error get details', err));
  }

  generateAwardsMainAndMore(awards) {
    let mainAwardsTotalStringLength = 0;
    const mainAwardsArr = [];
    const moreAwardsArr = [];

    for (let i = 0; i < awards.length; i += 1) {
      const { name, year } = awards[i];
      const award = `${name} (${year})`;
      if (mainAwardsTotalStringLength < 210) {
        mainAwardsTotalStringLength += (award.length + 2);
        mainAwardsArr.push(award);
      } else {
        moreAwardsArr.push(award);
      }
    }

    const allAwardsArray = [mainAwardsArr, moreAwardsArr];

    if (allAwardsArray[1].length === 0) {
      allAwardsArray[1] = null;
    }

    return allAwardsArray;
  }

  generateAwardsLine(array) {
    // const awardsMain = array;
    const awardSpanArray = [];
    const lastIndex = array.length - 1;

    array.slice(0, lastIndex).forEach((award, i) => {
      awardSpanArray.push(<GreenButton key={i}>{`${award}, `}</GreenButton>);
    });

    awardSpanArray.push(<GreenButton key={lastIndex}>{array[lastIndex]}</GreenButton>);

    return awardSpanArray;
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({ moreToggle: !state.moreToggle }));
  }

  render() {
    const { awardsMain, awardsMore, moreToggle } = this.state;

    if (awardsMain === null) {
      return (null);
    }

    return (
      <div>
        <DetailBoxRowTitle>Awards</DetailBoxRowTitle>
        <DetailBoxRowItem>
          {this.generateAwardsLine(awardsMain)}
          {moreToggle && (<br />)}
          {moreToggle && this.generateAwardsLine(awardsMore)}
          {
            awardsMore && (
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

export default Awards;
