import React from 'react';
import { mount } from 'enzyme';
import HeaderPopUpBanner from './HeaderPopUpBanner';

describe('HeaderPopUpBanner', () => {
  let wrapper;
  beforeEach(() => { wrapper = mount(<HeaderPopUpBanner />); });

  it('renders without crashing', () => {
    expect(wrapper.find('div.popup_banner')).toHaveLength(1);
  });

  it('adds className closed when user click the X button', () => {
    const spy = jest.spyOn(wrapper.instance(), 'hidePopUp');
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find('.popup_off_banner').first().simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});