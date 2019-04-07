import React from 'react';
import { shallow } from 'enzyme';
import Tooltip, {
  Wrapper, BorderFrame, BorderCenter, Book, Arrow, Stars, StatusButton, ToolTipArrow,
} from '../OtherEditionsParts/tooltip';

describe('Tooltip Component', () => {
  const tooltipData = {
    isbn10: 'isbn10',
    isbn13: 'isbn13',
    originalPubDate: 'date1',
    publisher: 'publisher',
    title: 'title',
    type: 'type',
  };

  const wrapper = shallow(<Tooltip {...tooltipData} />);

  test('Tooltip renders properly when given tooltip props', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('Tooltip contains CSS components Wrapper, BorderFrame, BorderCenter, Book and ToolTipArrow', () => {
    expect(wrapper.find(Wrapper).length).toEqual(1);
    expect(wrapper.find(BorderFrame).length).toEqual(1);
    expect(wrapper.find(BorderCenter).length).toEqual(1);
    expect(wrapper.find(Book).length).toEqual(1);
    expect(wrapper.find(ToolTipArrow).length).toEqual(1);
  });

  test('Tooltip contains statusButton components and rating components', () => {
    expect(wrapper.find(Arrow).length).toEqual(1);
    expect(wrapper.find(StatusButton).length).toEqual(1);
    expect(wrapper.find(Stars).length).toEqual(1);
  });
});
