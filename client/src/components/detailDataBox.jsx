import React from 'react';
import styled from 'styled-components';
import { MainInfo } from './mainInfo.jsx';

const DataBoxWrapper = styled.div`
  margin: 10px 0px;
`;

const DetailDataBox = (props) => {
  const {
    title, isbn10, isbn13, language,
  } = props.details;

  const mainInfo = {
    title, isbn10, isbn13, language,
  }

  return (
    <div>
      <DataBoxWrapper>

        <MainInfo
          mainInfo={mainInfo}
        />

      </DataBoxWrapper>
    </div>
  );
};

export default DetailDataBox;
