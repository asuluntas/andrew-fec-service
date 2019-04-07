import React from 'react';
import { shallow } from 'enzyme';
import Stars from '../editions_components/stars';

describe('Stars Component', () => {
  const wrapper = shallow(<Stars />);

  test('Stars renders properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('Stars contains rating state and has default value of 0', () => {
    expect(wrapper.state('rating')).toEqual(0);
  });
});
