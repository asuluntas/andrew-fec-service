import React from 'react';
import styled from 'styled-components';
import Tooltip from './tooltip.jsx';

const ImgLiWrapper = styled.li`
display: inline-block;
list-style-type: none;
margin: 0px;
padding-top: 3px;
padding-right: 2px;
position: relative;
`;

const ImgWrapper = styled.img`
  max-width: 55px;
  height: 55px;
  border: 0;
`;

const TooltipWrapper = styled.div`
  display: none;

  ${ImgLiWrapper}:hover & {
    display: block;
  }
`;

const Edition = (props) => {
  const { editionData } = props;
  const { id, coverurl, title } = editionData;

  return (
    <ImgLiWrapper key={id}>
      <ImgWrapper className="editionImg" key={id} src={coverurl} alt={title} />
      <TooltipWrapper>
        <Tooltip {...editionData} />
      </TooltipWrapper>
    </ImgLiWrapper>
  );
};

export default Edition;
