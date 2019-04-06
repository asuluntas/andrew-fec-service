import React from 'react';
import styled from 'styled-components';
import { GreyItem } from '../header.jsx';

const DetailBoxRowTitle = styled.div`
  color: #382110;
  font-weight: bold;
  width: 25%;
  float: left;
`;

const DetailBoxRowItem = styled.div`
  width: 75%;
  float: left;
`;

const MainInfo = (props) => {
  const {
    title, isbn10, isbn13, language,
  } = props.mainInfo;

  return (
    <div>
      <div>
        <DetailBoxRowTitle>Original Title</DetailBoxRowTitle>
        <DetailBoxRowItem>{title}</DetailBoxRowItem>
      </div>
      <div>
        <DetailBoxRowTitle>ISBN</DetailBoxRowTitle>
        <DetailBoxRowItem>
          {`${isbn10}`}
          &nbsp;
          <GreyItem>{`(ISBN13: ${isbn13})`}</GreyItem>
        </DetailBoxRowItem>
      </div>
      <div>
        <DetailBoxRowTitle>Language</DetailBoxRowTitle>
        <DetailBoxRowItem>{language}</DetailBoxRowItem>
      </div>
    </div>
  );
};

export {
  MainInfo,
  DetailBoxRowTitle,
  DetailBoxRowItem,
};
