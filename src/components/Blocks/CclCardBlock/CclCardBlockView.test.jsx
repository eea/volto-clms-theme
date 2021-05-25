import React from 'react';
import renderer from 'react-test-renderer';
import CclCardBlockView from './CclCardBlockView';
import { MemoryRouter } from 'react-router-dom';

describe('CclCardBlockView', () => {
  it('Check card block view', () => {
    const data = {
      title: 'example title',
      description: 'example description',
      image: [
        {
          scales: [
            {
              icon: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              large: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              listing: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              mini: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              preview: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              thumb: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
              tile: {
                download:
                  'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              },
            },
          ],
        },
      ],
      url: './',
    };

    const CardBlockView = renderer
      .create(
        <MemoryRouter>
          <CclCardBlockView data={data}>
            <p>Card block view test</p>
          </CclCardBlockView>
        </MemoryRouter>,
      )
      .toJSON();
    expect(CardBlockView).toBeDefined();
  });
});
