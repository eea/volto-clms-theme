import CclButton from './CclButton';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

describe('CclButton', () => {
  it('Check external link', () => {
    const button = renderer
      .create(
        <CclButton
          url="https://www.example.com"
          download={false}
          disabled={false}
          mode="mode"
          style={{
            backgroundColor: 'red',
          }}
        >
          <p>Hello!</p>
        </CclButton>,
      )
      .toJSON();
    expect(button).toBeDefined();
  });

  it('Check internal link', () => {
    const button = renderer
      .create(
        <MemoryRouter>
          <CclButton
            url="/example"
            download={false}
            disabled={false}
            mode="mode"
            style={{
              backgroundColor: 'red',
            }}
          >
            <p>Hello!</p>
          </CclButton>
        </MemoryRouter>,
      )
      .toJSON();
    expect(button).toBeDefined();
  });
  it('Check default values', () => {
    const button = renderer
      .create(
        <MemoryRouter>
          <CclButton />
        </MemoryRouter>,
      )
      .toJSON();
    expect(button).toBeDefined();
  });
});
