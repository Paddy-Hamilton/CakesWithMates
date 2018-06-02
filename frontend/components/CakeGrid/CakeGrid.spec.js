import React from 'react';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { fakeCake } from '../../lib/testUtils';
import { CakeGridStyled } from '.';
const cakes = [fakeCake('ASD123'), fakeCake('QWE234'), fakeCake('RTY456'), fakeCake('DFG567')];

describe('<CakeGridStyled/>', () => {
  it('renders cake cards when has cakes array', async () => {
    const wrapper = mount(<CakeGridStyled cakes={cakes} />);
    expect(toJSON(wrapper.find('#testr'))).toMatchSnapshot();
    expect(wrapper.find('CakeCard')).toHaveLength(4);
  });
  it('renders no cakes info if no cakes in array', async () => {
    const wrapper = mount(<CakeGridStyled cakes={[]} />);
    const p = wrapper.find('p');

    const Grid = wrapper.find('Grid');
    expect(p.text()).toBe('No items do display');
    expect(wrapper.find('CakeCard')).toHaveLength(0);
  });
});
