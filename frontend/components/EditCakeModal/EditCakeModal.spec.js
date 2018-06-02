import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { fakeCake } from '../../lib/testUtils';
import wait from 'waait';
import { EditCakeModalStyled } from './index';
import { createMount } from '@material-ui/core/test-utils';

const cake = fakeCake('ASD123');
const defaultProps = { isOpen: { data: { editCakeModalOpen: true } } };

describe('<EditCakeModalStyled/>', () => {
  test('renders', () => {
    let mmount = createMount();
    const wrapper = mmount(<EditCakeModalStyled {...defaultProps} />);
    const h2 = wrapper.find('h2');
    expect(h2.text()).toBe('Create cake');
    expect(toJSON(h2)).toMatchSnapshot();
  });
  describe('When id is sent in props', () => {
    it('the form is prepopulated form', async () => {
      const wrapper = mount(<EditCakeModalStyled {...defaultProps} {...cake} />);

      const nameInput = wrapper.find('input#cake-name');
      const commentInput = wrapper.find('textarea#cake-comment');
      const imgUrlInput = wrapper.find('input#cake-image-url');
      expect(nameInput.get(0).props.value).toBe(cake.name);
      expect(commentInput.get(0).props.value).toBe(cake.comment);
      expect(imgUrlInput.get(0).props.value).toBe(cake.imageUrl);
    });
    it('the title is edit mode specific', () => {
      const wrapper = mount(<EditCakeModalStyled {...cake} {...defaultProps} />);
      const h2 = wrapper.find('h2');
      expect(h2.text()).toBe('Edit cake');
    });
  });
  it('displays changes', () => {
    const wrapper = mount(<EditCakeModalStyled {...defaultProps} />);
    const nameInput = wrapper.find('input#cake-name');
    nameInput.simulate('change', { target: { value: 'Simulated cake name' } });
    expect(wrapper.find('EditCakeModal').instance().state.name).toBe('Simulated cake name');
  });
});
