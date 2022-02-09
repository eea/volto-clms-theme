import React from 'react';
import renderer from 'react-test-renderer';
import CLMSNewsItemView from './CLMSNewsItemView';
import { MemoryRouter } from 'react-router-dom';

describe('CLMSNewsItemView', () => {
  it('Check CLMSNewsItemView default values', () => {
    const content = {
      title: 'example title',
      /*image: {
        image:"https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
      }*/
    };
    const newsView = renderer
      .create(
        <MemoryRouter>
          <CLMSNewsItemView content={content}>
            <p>Event view test</p>
          </CLMSNewsItemView>
        </MemoryRouter>,
      )
      .toJSON();
    expect(newsView).toBeDefined();
  });
  it('Check CLMSNewsItemView custom values', () => {
    const content = {
      title: 'example title',
      image: {
        image:
          'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      },
    };
    const newsView = renderer
      .create(
        <MemoryRouter>
          <CLMSNewsItemView content={content}>
            <p>Event view test</p>
          </CLMSNewsItemView>
        </MemoryRouter>,
      )
      .toJSON();
    expect(newsView).toBeDefined();
  });
});
