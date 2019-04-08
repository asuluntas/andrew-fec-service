/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import axios from 'axios';
import { DetailBoxRowTitle, DetailBoxRowItem } from './mainInfo.jsx';
import { GreenButton } from '../header.jsx';

class Characters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreToggle: false,
      charactersMain: null,
      charactersMore: null,
    };
  }

  componentDidMount() {
    if (this.state.charactersMain === null) {
      this.getCharacters();
    }
  }

  getCharacters() {
    const { id } = this.props;
    axios.get(`/books/${id}/details/characters`)
      .then((res) => {
        const allCharactersArr = this.generateCharactersMainAndMore(res.data);
        this.setState({
          charactersMain: allCharactersArr[0],
          charactersMore: allCharactersArr[1],
        });
      })
      .catch(err => console.log('error get details', err));
  }

  generateCharactersMainAndMore(characters) {
    let mainCharactersTotalStringLength = 0;
    const mainCharactersArr = [];
    const moreCharactersArr = [];

    for (let i = 0; i < characters.length; i += 1) {
      const { name } = characters[i];
      if (mainCharactersTotalStringLength < 100) {
        mainCharactersTotalStringLength += (name.length + 2);
        mainCharactersArr.push(name);
      } else {
        moreCharactersArr.push(name);
      }
    }

    const allCharactersArray = [mainCharactersArr, moreCharactersArr];

    if (allCharactersArray[1].length === 0) {
      allCharactersArray[1] = null;
    }

    return allCharactersArray;
  }

  generateCharactersLine(array) {
    const charactersMain = array;
    const characterSpanArray = [];
    const lastIndex = charactersMain.length - 1;

    charactersMain.slice(0, lastIndex).forEach((character, i) => {
      characterSpanArray.push(<GreenButton key={i}>{`${character}, `}</GreenButton>);
    });

    characterSpanArray.push(<GreenButton key={lastIndex}>{charactersMain[lastIndex]}</GreenButton>);

    return characterSpanArray;
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({ moreToggle: !state.moreToggle }));
  }

  render() {
    const { charactersMain, charactersMore, moreToggle } = this.state;

    if (charactersMain === null) {
      return (null);
    }

    return (
      <div>
        <DetailBoxRowTitle>Characters</DetailBoxRowTitle>
        <DetailBoxRowItem>
          { this.generateCharactersLine(charactersMain) }
          {moreToggle && (<span>, </span>) }
          {moreToggle && this.generateCharactersLine(charactersMore)}
          {
            charactersMore && (
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

export default Characters;
