import React from 'react';
import styled from 'styled-components';
import { MainInfo } from './DetailDataBoxParts/mainInfo.jsx';
import Characters from './DetailDataBoxParts/characters.jsx';
import Settings from './DetailDataBoxParts/settings.jsx';
import Awards from './DetailDataBoxParts/awards.jsx';

const DataBoxWrapper = styled.div`
  margin: 10px 0px;
`;

const DetailDataBox = (props) => {
  const {
    id, title, isbn10, isbn13, language,
  } = props.details;

  const mainInfo = {
    id, title, isbn10, isbn13, language,
  };

  return (
    <div>
      <DataBoxWrapper>
        <MainInfo
          mainInfo={mainInfo}
        />
        <Characters id={id} />
        <Settings id={id} />
        <Awards id={id} />
      </DataBoxWrapper>
    </div>
  );
};

export default DetailDataBox;
