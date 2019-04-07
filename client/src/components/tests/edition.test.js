import React from 'react';
import { shallow } from 'enzyme';
import Edition from '../editions_components/edition';
import Tooltip from '../editions_components/tooltip';

describe('Edition Component', () => {
  const editionData = {
    id: 1,
    coverurl: 'coverurl',
    title: 'title',
  };

  const wrapper = shallow(<Edition editionData={editionData} />);

  test('Edition renders properly when given detail props', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('Edition contains an edition img', () => {
    expect(wrapper.find('.editionImg').length).toEqual(1);
  });

  test('Edition contains Tooltip component', () => {
    expect(wrapper.find(Tooltip).length).toEqual(1);
  });
});
