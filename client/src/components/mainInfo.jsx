import React from 'react';

const MainInfo = (props) => {
  const {
    title, isbn10, isbn13, language,
  } = props.mainInfo;

  console.log(props.mainInfo, 'maininfo!')
  return (
    <div>

      <div>
        <div>Original Title</div>
        <div>{title}</div>
      </div>

      <div>
        <div>ISBN</div>
        <div>
          <span>{`${isbn10}`}</span>
          <span>{`(ISBN13: ${isbn13})`}</span>
        </div>
      </div>

      <div>
        <div>Edition Language</div>
        <div>{language}</div>
      </div>

    </div>
  );
};

export default MainInfo;
