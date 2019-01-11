import React from 'react';
import { render } from 'enzyme';
import CardList from '.';
import { BrowserRouter } from 'react-router-dom';

test('Should render a card list', () => {
    const items = [
        {
            photo : 'http://photo.com',
            title : 'photo-title',
            price : 222,
            id    : 6575
        },
        {
            photo : 'http://photo.com-1',
            title : 'photo-title-1',
            price : 2221,
            id    : 65751
        }
    ];

    const cardList = render(
        <BrowserRouter>
            <CardList items={items} />
        </BrowserRouter>
    );

    expect(cardList.find('div.card-component')).toHaveLength(items.length);
});
