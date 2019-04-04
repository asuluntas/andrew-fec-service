import React from 'react';
import MainInfo from './mainInfo.jsx';

const DetailDataBox = (props) => {
  const {
    title, isbn10, isbn13, language,
  } = props.details;

  const mainInfo = {
    title, isbn10, isbn13, language,
  }

  return (
    <div>
      <MainInfo
        mainInfo={mainInfo}
      />
    </div>
  );
};

export default DetailDataBox;
