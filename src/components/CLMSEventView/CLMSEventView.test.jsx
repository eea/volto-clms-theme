import React from 'react';
import renderer from 'react-test-renderer';
import CLMSEventView from './CLMSEventView';
import { MemoryRouter } from 'react-router-dom';

describe('CLMSEventView', () => {
  it('Check CLMSEventView with default values', () => {
    const content = {
      title: 'example title',
      /*image: {
        image:"https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg",
      }*/
    };
    const eventView = renderer
      .create(
        <MemoryRouter>
          <CLMSEventView content={content}>
            <p>Event view test</p>
          </CLMSEventView>
        </MemoryRouter>,
      )
      .toJSON();
    expect(eventView).toBeDefined();
  });
  it('Check CLMSEventView with custom values', () => {
    const content = {
      title: 'example title',
      image: {
        image:
          'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      },
    };
    const eventView = renderer
      .create(
        <MemoryRouter>
          <CLMSEventView content={content}>
            <p>Event view test</p>
          </CLMSEventView>
        </MemoryRouter>,
      )
      .toJSON();
    expect(eventView).toBeDefined();
  });
});
