import React from 'react';
import { shallow } from 'enzyme';
import Detail from '.';

test('Should show the price with €', () => {
    const props = {
        photo : 'http://photo.com-1',
        title : 'photo-title-1',
        price : 2221
    };

    const detail = shallow(<Detail {...props} />);
    expect(detail.find('span').text()).toEqual(`${props.price}€`);
});
