/* eslint-env mocha */
/* global expect, sinon */
import React from 'react';
import { shallow } from 'enzyme';

import { Blog } from './Blog';

describe('<Blog />', () => {
  function setup(props) {
    const newProps = {
      articles: [],
      ...props,
    };

    const wrapper = shallow(<Blog {...newProps}><children /></Blog>);
    const instance = wrapper.instance();

    return { wrapper, instance };
  }

  it('renders', () => {
    const { wrapper, instance } = setup();

    expect(wrapper).to.be.ok; /* eslint no-unused-expressions: 0 */
    expect(instance).to.be.ok; /* eslint no-unused-expressions: 0 */
  });

  it('renders list of articles', () => {
    const articles = [
      {
        slug: 'slug1',
        title: 'title1',
      },
      {
        slug: 'slug2',
        title: 'title2',
      },
      {
        slug: 'slug3',
        title: 'title3',
      },
    ];
    const { wrapper } = setup({ articles });

    expect(wrapper.find('li')).to.have.length(articles.length);
  });
});
