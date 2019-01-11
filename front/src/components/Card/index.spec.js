import React from 'react';
import { shallow } from 'enzyme';
import Card from '.';

test('Should render a Card component', () => {
    const props = {
        photo : 'http://photo.com',
        title : 'photo-title',
        price : 222,
        id    : 6575
    };
    const card = shallow(<Card {...props} />);
    expect(card.find('.card-component').exists()).toEqual(true);
});
