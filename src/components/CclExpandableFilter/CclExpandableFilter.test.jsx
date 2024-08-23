import { render, screen, fireEvent } from '@testing-library/react';
import CclExpandableFilter from './CclExpandableFilter';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

describe('CclExpandableFilter', () => {
  it('Check if CclExpandableFilter renders correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <CclExpandableFilter title="title example">
          <p>Expandable filter test</p>
        </CclExpandableFilter>
      </MemoryRouter>,
    );
    expect(container).toBeDefined();
  });

  it('Check if clicks work', () => {
    const clicktest = jest.fn();

    render(
      <CclExpandableFilter
        trigger={
          <div
            className="ccl-dropdown__link ccl-expandable__button"
            aria-expanded={false}
            onClick={clicktest}
            onKeyDown={clicktest}
            tabIndex="0"
            role="button"
          >
            Filter
          </div>
        }
      >
        <p>Hello test!</p>
      </CclExpandableFilter>,
    );

    const triggerElement = document.querySelector(
      '.ccl-dropdown__link.ccl-expandable__button',
    );

    fireEvent.click(triggerElement);
    fireEvent.keyDown(triggerElement);

    expect(clicktest).toHaveBeenCalledTimes(0);
  });
});
