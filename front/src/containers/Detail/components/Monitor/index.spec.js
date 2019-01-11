import React from 'react';
import { shallow } from 'enzyme';
import Monitor from '.';

test('Should show message in singular', () => {
    const monitor = shallow(<Monitor users={1} />);
    expect(monitor.find('p.message').text()).toEqual(
        'there are other 1 person looking at this property'
    );
});

test('Should show message in plural', () => {
    const monitor = shallow(<Monitor users={10} />);
    expect(monitor.find('p.message').text()).toEqual(
        'there are other 10 people looking at this property'
    );
});
