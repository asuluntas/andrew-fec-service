import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DetailDataBox from './detailDataBox.jsx';
import OtherEditions from './otherEditions.jsx';

const DetailBody = styled.div`
  margin: 50px auto;
  width: 455px;
  background: #FFFFFF;
  padding: 5px 0;
  display: block;
  line-height: 18px;
  font-size: 12px;
  text-align: left;
  word-wrap: break-word;
  color: #333;
  font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
`;

const GreyItem = styled.span`
  color: #999999;
`;

const Buttons = styled.div`
  padding: 5px 0;
`;

const GreenButton = styled.span`
  color: #00635d;
  &:hover {
    text-decoration: underline;
  }
`;

const GreyButton = styled(GreenButton)`
  color: #999999;
  float: right;
  margin-right: 5px;
`;

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

  generatePublisherInfoLine() {
    const {
      type, pagenum, originalPubDate, firstPubDate, publisher,
    } = this.state.details;
    const typeAndPageNumberLine = `${type}, ${pagenum} pages`;
    const publishInfoLine = `Published ${originalPubDate} by ${publisher}`;
    const firstPubDateLine = `(first published ${firstPubDate} )`;

    return (
      <div>
        <div>{typeAndPageNumberLine}</div>
        <div>
          {publishInfoLine}
          &nbsp;
          <GreyItem>{firstPubDateLine}</GreyItem>
        </div>
      </div>
    );
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({ moreToggle: !state.moreToggle }));
  }

  render() {
    if (!this.state.details) {
      return (null);
    }

    const { id, moreToggle } = this.state;
    return (
      <DetailBody>
        {this.generatePublisherInfoLine()}

        {moreToggle ? (<DetailDataBox className="DetailDataBox" details={this.state.details} />) : null}
        {moreToggle ? (<OtherEditions className="OtherEditions" id={id} />) : null}

        <Buttons>
          <GreenButton onClick={(e) => { this.handleClick(e); }}>
            {moreToggle ? '...Less Detail' : 'More Details...'}
          </GreenButton>
          <GreyButton>
            edit details
          </GreyButton>
        </Buttons>

      </DetailBody>
    );
  }
}

export {
  Header,
  GreenButton,
  GreyItem,
};
