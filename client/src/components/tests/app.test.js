import React from 'react';
import { shallow } from 'enzyme';
import App from '../../app';

describe('App Component', () => {
  it('should render App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });
});
