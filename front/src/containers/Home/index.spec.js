import React from 'react';
import { shallow } from 'enzyme';
import Home from '.';

jest.mock('../../api');

test('Should show the home market', done => {
    const home = shallow(<Home />);

    setTimeout(() => {
        home.update();
        const state = home.instance().state;
        expect(state.cards).toBeInstanceOf(Array);
        expect(state.cards).toHaveLength(5);
        done();
    });
});
