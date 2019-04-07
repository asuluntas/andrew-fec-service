import React from 'react';
import { shallow } from 'enzyme';
import { MainInfo, DetailBoxRowTitle, DetailBoxRowItem } from '../DetailDataBoxParts/mainInfo';
import { GreyItem } from '../header';

describe('MainInfo Component', () => {
  const mainInfo = {
    title: 'title',
    isbn10: 'isbn10',
    isbn13: 'isbn13',
    language: 'language',
  };
  const wrapper = shallow(<MainInfo mainInfo={mainInfo} />);

  test('Main renders properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('MainInfo should contain three DetailBoxRowTitle divs with text Original Title, ISBN, Language', () => {
    expect(wrapper.containsMatchingElement(<DetailBoxRowTitle>Original Title</DetailBoxRowTitle>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<DetailBoxRowTitle>ISBN</DetailBoxRowTitle>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<DetailBoxRowTitle>Language</DetailBoxRowTitle>)).toEqual(true);
  });

  test('MainInfo should contain three DetailBoxRowItem divs', () => {
    expect(wrapper.find(DetailBoxRowItem).length).toEqual(3);
  });

  test('MainInfo should also contain one grey text span for isbn13 display', () => {
    expect(wrapper.find(GreyItem).length).toEqual(1);
  });
});
