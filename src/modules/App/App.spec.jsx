/* eslint-env mocha */
/* global expect, sinon */
import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('<App />', () => {
  function setup() {
    const wrapper = shallow(<App><children /></App>);
    const instance = wrapper.instance();

    return { wrapper, instance };
  }

  it('renders', () => {
    const { wrapper, instance } = setup();

    expect(wrapper).to.be.ok; /* eslint no-unused-expressions: [off] */
    expect(instance).to.be.ok; /* eslint no-unused-expressions: [off] */
  });

  it('renders its children', () => {
    const { wrapper } = setup();
    const children = wrapper.find('children');

    expect(children).to.have.length(1);
  });
});
