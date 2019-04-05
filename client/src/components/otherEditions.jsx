import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { DetailBoxRowTitle, DetailBoxRowItem } from './mainInfo.jsx';
import { GreenButton, GreyItem } from './header.jsx';

const ImgWrapper = styled.img`
  max-width: 55px;
  height: 55px;
  border: 0;
`;

const ImgUlWrapper = styled.ul`
  display: block;
  list-style-type: disc;
  margin-block-start: 0px;
  margin-block-end: 5px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
`;

const ImgLiWrapper = styled.li`
  display: inline-block;
  list-style-type: none;
  margin: 0px;
  padding-top: 3px;
  padding-right: 2px;
`;

class Editions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editionsMain: null,
      editionsMore: null,
      editionsCount: null,
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
          editionsCount: length,
        });
      })
      .catch(err => console.log('error get details', err));
  }

  generateImageLine() {
    const { editionsMain } = this.state;
    const imgArray = [];
    editionsMain.forEach((edition, i) => {
      const { id, coverurl, title } = edition;
      imgArray.push(
        <ImgLiWrapper key={id} value={id}>
          <ImgWrapper key={id} value={id} src={coverurl} alt={title} />
        </ImgLiWrapper>
      );
    });
    return imgArray;
  }

  render() {
    console.log(this.state);
    const { editionsCount, editionsMain, editionsMore } = this.state;

    if (editionsMain === null) {
      return (null);
    }

    return (
      <div>
        <DetailBoxRowTitle>
          {`Other Editions (${editionsCount})`}
        </DetailBoxRowTitle>
        <DetailBoxRowItem>
          <ImgUlWrapper>
            {this.generateImageLine()}
          </ImgUlWrapper>
          <div>
            <GreenButton>All Editions</GreenButton>
            <GreyItem>{' | '}</GreyItem>
            <GreenButton>Add a New Editions</GreenButton>
            <GreyItem>{' | '}</GreyItem>
            <GreenButton>Combine</GreenButton>
          </div>
        </DetailBoxRowItem>
      </div>
    );
  }
}

export default Editions;
