import React from 'react';
import renderer from 'react-test-renderer';
import CLMSEventView from './CLMSEventView';
import { MemoryRouter } from 'react-router-dom';

describe('CLMSEventView', () => {
  it('Check CLMSEventView with default values', () => {
    const content = {
      title: 'example title',
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
    const content1 = {
      title: 'example title',
      image: {
        image:
          'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      },
    };
    const eventView = renderer
      .create(
        <MemoryRouter>
          <CLMSEventView content={content1}>
            <p>Event view test</p>
          </CLMSEventView>
        </MemoryRouter>,
      )
      .toJSON();
    expect(eventView).toBeDefined();
  });
  it('Check CLMSEventView with whole day and location value', () => {
    const content1 = {
      title: 'example title',
      image: {
        image:
          'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
      },
      whole_day: true,
      start: '2020-01-01',
      end: '2020-01-01',
      location: 'example location',
    };
    const eventView = renderer
      .create(
        <MemoryRouter>
          <CLMSEventView content={content1}>
            <p>Event view test</p>
          </CLMSEventView>
        </MemoryRouter>,
      )
      .toJSON();
    expect(eventView).toBeDefined();
  });
});
