import React from 'react';
import renderer from 'react-test-renderer';
import MetadataContent from './MetadataContent';
import { MemoryRouter } from 'react-router-dom';

describe('MetadataContent', () => {
  it('Check metadata view', () => {
    const data = {
      url: './example',
      download: true,
      dataResourceTitle: 'example title',
      dataResourceAbstract: {
        data: 'exampledata',
      },
      coordinateReferenceSystem: 'example reference system',
      qualityLineage: {
        data: 'exampledata',
      },
      qualitySpatialResolution: {
        data: 'exampledata',
      },
      conformitySpecification: {
        data: 'exampledata',
      },
      accessAndUseConstraints: {
        data: 'exampledata',
      },
      accessAndUseLimitationPublic: {
        data: 'exampledata',
      },
      owners: {
        data: 'exampledata',
      },
      responsiblePartyRole: {
        data: 'exampledata',
      },
    };
    const metadata = renderer
      .create(
        <MemoryRouter>
          <MetadataContent data={data}>
            <p>Metadata view test</p>
          </MetadataContent>
        </MemoryRouter>,
      )
      .toJSON();
    expect(metadata).toBeDefined();
  });
});
