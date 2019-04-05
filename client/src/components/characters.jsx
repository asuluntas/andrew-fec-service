/* eslint-disable class-methods-use-this */
import React from 'react';
import axios from 'axios';
import { DetailBoxRowTitle, DetailBoxRowItem } from './mainInfo.jsx';
import { GreenButton } from './header.jsx';

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
        const charactersLineArr = this.generateCharacterLineArray(res.data);
        this.setState({
          charactersMain: charactersLineArr[0],
          charactersMore: charactersLineArr[1],
        });
      })
      .catch(err => console.log('error get details', err));
  }

  generateCharacterLineArray(characters) {
    let stringCount1 = 0;
    const string1Arr = [];
    const string2Arr = [];

    for (let i = 0; i < characters.length; i += 1) {
      const { name } = characters[i];
      if (stringCount1 < 100) {
        stringCount1 += (name.length + 2);
        string1Arr.push(name);
      } else {
        string2Arr.push(name);
      }
    }

    const stringArray = [string1Arr, string2Arr];

    if (stringArray[1].length === 0) {
      stringArray[1] = null;
    }

    return stringArray;
  }

  charactersLine(array) {
    const charactersMain = array;
    const spanArray = [];
    const lastIndex = charactersMain.length - 1;

    charactersMain.slice(0, lastIndex).forEach((elem, i) => {
      spanArray.push(<GreenButton key={i}>{elem + ', '}</GreenButton>);
    });

    spanArray.push(<GreenButton key={lastIndex}>{charactersMain[lastIndex]}</GreenButton>);

    return spanArray;
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
          { this.charactersLine(charactersMain) }
          {moreToggle && (<span>, </span>) }
          {moreToggle && this.charactersLine(charactersMore)}
          {
            charactersMore && (
            <GreenButton
              onClick={(e) => { this.handleClick(e); }}
            >
              {moreToggle ? '...less' : '...more'}
            </GreenButton>
            )
          }
        </DetailBoxRowItem>
      </div>
    );
  }
}

export default Characters;
