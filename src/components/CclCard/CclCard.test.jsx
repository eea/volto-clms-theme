import React from 'react';
import renderer from 'react-test-renderer';
import CclCard from './CclCard';
import { MemoryRouter } from 'react-router-dom';

describe('CclCard', () => {
  it('Check event card', () => {
    const card = {
      start:
        'Wed May 19 2021 12:49:04 GMT+0200 (hora de verano de Europa central)',
      end:
        'Wed May 26 2024 12:49:04 GMT+0200 (hora de verano de Europa central)',
      title: 'Test 001',
    };
    let start = new Date(card?.start);
    let end = new Date(card?.end);
    const cardtest = renderer
      .create(
        <MemoryRouter>
          <CclCard
            type="event"
            title="title example"
            description="description example"
            docInfo="DOC"
            image={{
              src:
                'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              scales: 'mini',
              download: 'false',
            }}
            start={start.toLocaleDateString()}
            end={end.toLocaleDateString()}
          >
            <p>Event card test</p>
          </CclCard>
        </MemoryRouter>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
  it('Check doc card', () => {
    const cardtest = renderer
      .create(
        <MemoryRouter>
          <CclCard
            type="doc"
            title="title example"
            description="description example"
            docInfo="DOC"
            image={{
              src:
                'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              scales: 'mini',
              download: 'false',
            }}
            file={{
              src:
                'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              download: 'true',
            }}
          >
            <p>Doc card test</p>
          </CclCard>
        </MemoryRouter>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
  it('Check news card', () => {
    const cardtest = renderer
      .create(
        <MemoryRouter>
          <CclCard
            type="news"
            title="title example"
            description="description example"
            docInfo="DOC"
            image={{
              src:
                'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              scales: 'mini',
              download: 'false',
            }}
            effective="Wed May 19 2021 12:49:04 GMT+0200 (hora de verano de Europa central)"
          >
            <p>News card test</p>
          </CclCard>
        </MemoryRouter>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
  it('Check three collumns card', () => {
    const cardtest = renderer
      .create(
        <MemoryRouter>
          <CclCard
            type="threeColumns"
            title="title example"
            description="description example"
            docInfo="DOC"
            image={{
              src:
                'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              scales: 'mini',
              download: 'false',
            }}
            effective="Wed May 19 2021 12:49:04 GMT+0200 (hora de verano de Europa central)"
          >
            <p>threeColumns card test</p>
          </CclCard>
        </MemoryRouter>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
  it('Check block card', () => {
    const cardtest = renderer
      .create(
        <MemoryRouter>
          <CclCard
            type="block"
            title="title example"
            description="description example"
            docInfo="DOC"
            image={{
              src:
                'https://eu-copernicus.github.io/copernicus-component-library/assets/images/image_placeholder.jpg',
              scales: 'mini',
              download: 'false',
            }}
            effective="Wed May 19 2021 12:49:04 GMT+0200 (hora de verano de Europa central)"
          >
            <p>Block card test</p>
          </CclCard>
        </MemoryRouter>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
  it('Check default card', () => {
    const cardtest = renderer
      .create(
        <MemoryRouter>
          <CclCard
            title="title example"
            description="description example"
            image={{
              scales: null,
            }}
          >
            <p>Line card test</p>
          </CclCard>
        </MemoryRouter>,
      )
      .toJSON();
    expect(cardtest).toBeDefined();
  });
  it('Check default values', () => {
    const card = renderer
      .create(
        <MemoryRouter>
          <CclCard />
        </MemoryRouter>,
      )
      .toJSON();
    expect(card).toBeDefined();
  });
});
