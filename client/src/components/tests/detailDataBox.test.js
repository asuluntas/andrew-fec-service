import React from 'react';
import { shallow } from 'enzyme';
import DetailDataBox from '../detailDataBox_components/detailDataBox';
import { MainInfo } from '../detailDataBox_components/mainInfo';
import Characters from '../detailDataBox_components/characters';
import Settings from '../detailDataBox_components/settings';
import Awards from '../detailDataBox_components/awards';

describe('DetailDataBox Component', () => {
  const details = {
    id: 1,
    title: 'title',
    isbn10: 'isbn10',
    isbn13: 'isbn13',
    language: 'language',
  };

  const wrapper = shallow(<DetailDataBox details={details} />);

  test('DetailDataBox renders properly when given detail props', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('DetailDataBox contains components MainInfo, Characters, Settings, and Awards', () => {
    expect(wrapper.find(MainInfo).length).toEqual(1);
    expect(wrapper.find(Characters).length).toEqual(1);
    expect(wrapper.find(Settings).length).toEqual(1);
    expect(wrapper.find(Awards).length).toEqual(1);
  });
});
