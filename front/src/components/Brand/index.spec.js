import React from 'react';
import { shallow } from 'enzyme';
import Brand from '.';

test('Should render the brand name', () => {
    const brand = shallow(<Brand name="baz" />);
    expect(brand.find('h1').text()).toEqual('baz');
});
