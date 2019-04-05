/* eslint-disable class-methods-use-this */
import React from 'react';
import axios from 'axios';
import { DetailBoxRowTitle, DetailBoxRowItem } from './mainInfo.jsx';
import { GreenButton } from './header.jsx';

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

  // charactersLine(array) {
  //   const charactersMain = array;
  //   const spanArray = [];
  //   const lastIndex = charactersMain.length - 1;

  //   charactersMain.slice(0, lastIndex).forEach((elem, i) => {
  //     spanArray.push(<GreenButton key={i}>{elem + ', '}</GreenButton>);
  //   });

  //   spanArray.push(<GreenButton key={lastIndex}>{charactersMain[lastIndex]}</GreenButton>);

  //   return spanArray;
  // }

  // handleClick(e) {
  //   e.preventDefault();
  //   this.setState(state => ({ moreToggle: !state.moreToggle }));
  // }

  render() {
    console.log(this.state);
    // const { charactersMain, charactersMore, moreToggle } = this.state;

    // if (charactersMain === null) {
      return (null);
    // }

    // return (
    //   <div>
    //     <DetailBoxRowTitle>Characters</DetailBoxRowTitle>
    //     <DetailBoxRowItem>
    //       {this.charactersLine(charactersMain)}
    //       {moreToggle && (<span>, </span>)}
    //       {moreToggle && this.charactersLine(charactersMore)}
    //       {
    //         charactersMore && (
    //           <GreenButton
    //             onClick={(e) => { this.handleClick(e); }}
    //           >
    //             {moreToggle ? '...less' : '...more'}
    //           </GreenButton>
    //         )
    //       }
    //     </DetailBoxRowItem>
    //   </div>
    // );
  }
}

export default Awards;
