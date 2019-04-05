import React from 'react';
import styled from 'styled-components';
import { GreyItem } from './header.jsx';

const DetailBoxRowTitle = styled.div`
  color: #382110;
  font-weight: bold;
  width: 25%;
  float: left;
`;

const DetialBoxRowItem = styled.div`
  width: 75%;
`;

// const GreyItem = styled.span`
//   color: #999999;
// `;

const MainInfo = (props) => {
  const {
    title, isbn10, isbn13, language,
  } = props.mainInfo;

  return (
    <div>

      <div>
        <DetailBoxRowTitle>Original Title</DetailBoxRowTitle>
        <DetialBoxRowItem>{title}</DetialBoxRowItem>
      </div>

      <div>
        <DetailBoxRowTitle>ISBN</DetailBoxRowTitle>
        <DetialBoxRowItem>
          {`${isbn10}`}
          &nbsp;
          <GreyItem>{`(ISBN13: ${isbn13})`}</GreyItem>
        </DetialBoxRowItem>
      </div>

      <div>
        <DetailBoxRowTitle>Language</DetailBoxRowTitle>
        <DetialBoxRowItem>{language}</DetialBoxRowItem>
      </div>

    </div>
  );
};

export {
  MainInfo,
  DetailBoxRowTitle,
  DetialBoxRowItem,
};
