/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DetailDataBox from './detailDataBox.jsx';

const DetailBody = styled.div`
  margin: 0px auto;
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

const FirstPubDate = styled.span`
  color: #999999;
`;

const Buttons = styled.div`
  padding: 5px 0;
`;

const MoreButton = styled.span`
  color: #00635d;
  &:hover {
    text-decoration: underline;
  }
`;

const EditButton = styled(MoreButton)`
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

  header() {
    const {
      type, pagenum, originalPubDate, firstPubDate, publisher,
    } = this.state.details;
    const typeAndPageNumberLine = `${type}, ${pagenum} pages`;
    const publishInfoLine = `Published ${originalPubDate} by ${publisher}`;
    const firstPubDateLine = `(first published ${firstPubDate} )`;

    return (
      <div>
        <div>{typeAndPageNumberLine}</div>
        <div>{publishInfoLine}  <FirstPubDate>{firstPubDateLine}</FirstPubDate></div>
      </div>
    );
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({ moreToggle: !state.moreToggle }));
  }

  render() {
    console.log(this.state);

    if (!this.state.details) {
      return (<div />);
    }
    const { moreToggle } = this.state;
    return (
      <DetailBody>
        {this.header()}

        {moreToggle ? (<DetailDataBox details={this.state.details} />) : null}

        <Buttons>
          <MoreButton onClick={(e) => { this.handleClick(e); }}>
            {moreToggle ? '...Less Detail' : 'More Details...'}
          </MoreButton>
          <EditButton>
            edit details
          </EditButton>
        </Buttons>

      </DetailBody>
    );
  }
}

export default Header;
