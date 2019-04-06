import React from 'react';
import styled from 'styled-components';
import { GreenButton, GreyItem } from '../header.jsx';

const Wrapper = styled.div`
  padding: 0px;
  margin: 0px 0px 5px;
  min-width: 300px;
  max-width: 330px;
  height: auto;
  clear: both;
  z-index: 10;
  border: 4px solid transparent;

  position: absolute;
  left: -143px;
  bottom: 55px;
  overflow: visible;

  font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
  font-size: 12px;
  color: #333333;
`;

const ToolTipArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid rgb(215, 210, 196);

  left: 50%
  float: left;
  position: relative;
`;

const BorderFrame = styled.div`
  border: 6px solid rgb(215, 210, 196);
  border-radius: 5px;
  height: 100%;
  width: 100%;
  float: left;
  margin: 0;
  padding: 0;
  position: relative;
`;


const BorderCenter = styled.div`
  padding: 6px 6px;
  background: white;
`;

const Book = styled.div`
  width: 100%;
`;

const StatusWrapper = styled.div`
  display: flex;
  border-width: 10px;
  border-radius: 3px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 8px;
  padding: 5px 10px;
  width: 110px;
  background-color: #409D69;
  border-color: #dddddd;

  text-align: left;
  font-size: 13px;
  font-weight: bold;
  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: white;

`;

export const RightButton = styled.span`
  border-left: 1px solid #38883d;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 3px solid white;
  left: 11px
  top: 7px
  position: relative;
`;

const Tooltip = (props) => {
  console.log('what is tooltip props? \n', props);
  const {
    isbn10, isbn13, originalPubDate, publisher, title, type,
  } = props;

  return (
    <Wrapper>
      <BorderFrame>
        <BorderCenter>
          <Book>
            <div>{`${title} (${type})`}</div>
            <div>{`isbn: ${isbn10}`}</div>
            <div>{`isbn13: ${isbn13}`}</div>
            <div>{`format: ${type}`}</div>
            <div>{`Published ${originalPubDate} by ${publisher}`}</div>
            <GreenButton>Enlarge cover</GreenButton>
            <StatusWrapper>
              {/* <div style={{ color: '#63ce92' }}></div> */}
              <span title="status" style={{ paddingRight: '10px' }}>Want to Read</span>
              <RightButton><Arrow /></RightButton>

            </StatusWrapper>

          </Book>
        </BorderCenter>
      </BorderFrame>
      <ToolTipArrow />
    </Wrapper>
  );
};

export default Tooltip;

{/* <Wrapper>
<DropDown>
  <div style={{ color: '#63ce92' }}><DoneIcon /></div>
  <span title="Read">Read</span>
</DropDown>
  <RightButton>
    <ShelfButton></ShelfButton>
  </RightButton>
</Wrapper> */}
