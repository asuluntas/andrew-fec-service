import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0px;
  margin: 0px 0px 5px;
  min-width: 300px;
  height: auto;
  clear: both;
  z-index: 10;
  border: 4px solid transparent;

  position: absolute;
  left: -143px;
  bottom: 55px;
  overflow: visible;

  font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
  font-size: 11px;
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

const Tooltip = (props) => {
  return (
    <Wrapper>
      <BorderFrame>
        <BorderCenter>
          <Book>
            TOOLTIP
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </Book>
        </BorderCenter>
      </BorderFrame>
      <ToolTipArrow />
    </Wrapper>
  );
};

export default Tooltip;
