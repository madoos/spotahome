import React from 'react';
import { omitMe, mapComponent, renderWhen } from './utils';
import { mount } from 'enzyme';
import { number, array } from 'prop-types';

const NumberComponent = ({ n }) => <spam>{n}</spam>;
NumberComponent.propTypes = { n : number };

test('.omitMe should substrate one', () => {
    expect(omitMe(-1)).toEqual(0);
    expect(omitMe(0)).toEqual(0);
    expect(omitMe(1)).toEqual(0);
    expect(omitMe(2)).toEqual(1);
});

test('.mapComponent should map a list of components', () => {
    const numbers = [{ n : 1 }, { n : 2 }];
    const NumberList = ({ items }) => (
        <div>{mapComponent(NumberComponent, items)}</div>
    );
    NumberList.propTypes = { items : array };

    const wrapper = mount(<NumberList items={numbers} />);
    const texts = wrapper.find('spam').map(node => node.text());
    expect(texts).toEqual(['1', '2']);
});

test('.renderWhen should return a component or null', () => {
    const NumberOk = renderWhen(() => true, NumberComponent);
    const NumberKO = renderWhen(() => false, NumberComponent);

    const numberOk = mount(<NumberOk n={1} />);
    expect(numberOk.find('spam').text()).toEqual('1');

    const numberKo = mount(<NumberKO n={1} />);
    expect(numberKo.html()).toBeNull();
});
