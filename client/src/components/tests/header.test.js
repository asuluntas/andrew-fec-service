import React from 'react';
import { shallow } from 'enzyme';
import { Header, GreenButton } from '../header';

describe('Header Component', () => {
  const wrapper = shallow(
    <Header match={{ params: { id: 1 } }} />,
  );

  const details = {
    firstPubDate: 'August 1st 1960',
    id: 1,
    isbn10: '6479378742',
    isbn13: '3195540423105',
    language: 'Korean',
    originalPubDate: 'August 1st 1960',
    pagenum: 873,
    publisher: 'Kunze Inc',
    title: 'compress cyan',
    type: 'Paperback',
  };

  test('Header returns null when given improper id number (101)', () => {
    const wrapperFalse = shallow(
      <Header match={{ params: { id: 101 } }} />,
    );
    expect(wrapperFalse.find('div').length).toEqual(0);
  });

  test('Header renders when given proper id number (1)', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('Header state moreToggle is false by default', () => {
    expect(wrapper.state('moreToggle')).toEqual(false);
  });

  test('Header state moreToggle is changed to true with click', () => {
    wrapper.setState({
      details,
    });

    wrapper.find(GreenButton).simulate('click', { preventDefault: () => {} });
    expect(wrapper.state('moreToggle')).toEqual(true);
  });

  test('DetailDataBox and OtherEditions rendered when moreToggle is true', () => {
    wrapper.setState({
      details,
      moreTogge: true,
    });

    expect(wrapper.find('.DetailDataBox').length).toEqual(1);
    expect(wrapper.find('.OtherEditions').length).toEqual(1);
  });
});
