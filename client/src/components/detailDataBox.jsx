import React from 'react';
import styled from 'styled-components';
import { MainInfo } from './mainInfo.jsx';
import Characters from './characters.jsx';

const DataBoxWrapper = styled.div`
  margin: 10px 0px;
`;

const DetailDataBox = (props) => {
  const {
    id, title, isbn10, isbn13, language,
  } = props.details;

  const mainInfo = {
    id, title, isbn10, isbn13, language,
  }
  console.log(props.details, 'what are my props in detailDataBox')
  return (
    <div>
      <DataBoxWrapper>

        <MainInfo
          mainInfo={mainInfo}
        />
        <Characters id={id} />

      </DataBoxWrapper>
    </div>
  );
};

export default DetailDataBox;
