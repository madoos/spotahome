import React from 'react';
import { shallow } from 'enzyme';
import Layout from '.';

test('Should wrap a children component', () => {
    const layout = shallow(
        <Layout>
            <span>foo</span>
        </Layout>
    );
    expect(layout.html()).toEqual(
        `<div class="layout-component"><span>foo</span></div>`
    );
});
