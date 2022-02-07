import React from 'react';
import renderer from 'react-test-renderer';
import CclSearchBlockView from './CclHomeSearchBlockView';
import CclSearchBlockEdit from './CclHomeSearchBlockEdit';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

const mockSearchBlockPros = {
  title: 'Test title!',
  link: [{ '@id': '#' }],
};

describe('CclSearchBlock', () => {
  it('Check search block view', () => {
    const SearchBlockView = renderer
      .create(
        <MemoryRouter>
          <IntlProvider locale="en">
            <CclSearchBlockView data={mockSearchBlockPros}>
              <p>Search block view test</p>
            </CclSearchBlockView>
          </IntlProvider>
        </MemoryRouter>,
      )
      .toJSON();
    expect(SearchBlockView).toMatchSnapshot();
  });
  it('Check search block edit', () => {
    const SearchBlockEdit = renderer
      .create(
        <MemoryRouter>
          <IntlProvider locale="en">
            <CclSearchBlockEdit data={mockSearchBlockPros}>
              <p>Search block edit test</p>
            </CclSearchBlockEdit>
          </IntlProvider>
        </MemoryRouter>,
      )
      .toJSON();
    expect(SearchBlockEdit).toMatchSnapshot();
  });
  it('Check search block edit without title', () => {
    const mockSearchBlockPros2 = {
      link: [{ '@id': '#' }],
    };
    const SearchBlockEdit = renderer
      .create(
        <MemoryRouter>
          <IntlProvider locale="en">
            <CclSearchBlockEdit data={mockSearchBlockPros2}>
              <p>Search block edit test</p>
            </CclSearchBlockEdit>
          </IntlProvider>
        </MemoryRouter>,
      )
      .toJSON();
    expect(SearchBlockEdit).toMatchSnapshot();
  });
  it('Check search block edit with http/https url', () => {
    const mockSearchBlockPros2 = {
      link: [{ '@id': 'https://google.com' }],
      linkText: 'Google',
    };
    const SearchBlockEdit = renderer
      .create(
        <MemoryRouter>
          <IntlProvider locale="en">
            <CclSearchBlockEdit data={mockSearchBlockPros2}>
              <p>Search block edit test</p>
            </CclSearchBlockEdit>
          </IntlProvider>
        </MemoryRouter>,
      )
      .toJSON();
    expect(SearchBlockEdit).toMatchSnapshot();
  });

  it('Check search block edit with http/https url without link text', () => {
    const mockSearchBlockPros2 = {
      link: [{ '@id': 'https://google.com' }],
    };
    const SearchBlockEdit = renderer
      .create(
        <MemoryRouter>
          <IntlProvider locale="en">
            <CclSearchBlockEdit data={mockSearchBlockPros2}>
              <p>Search block edit test</p>
            </CclSearchBlockEdit>
          </IntlProvider>
        </MemoryRouter>,
      )
      .toJSON();
    expect(SearchBlockEdit).toMatchSnapshot();
  });
  it('Check search block view with http/https url', () => {
    const data = {
      link: [{ '@id': 'https://google.com' }],
      linkText: 'Google',
    };
    const SearchBlockView = renderer
      .create(
        <MemoryRouter>
          <IntlProvider locale="en">
            <CclSearchBlockView data={data}>
              <p>Search block view test</p>
            </CclSearchBlockView>
          </IntlProvider>
        </MemoryRouter>,
      )
      .toJSON();
    expect(SearchBlockView).toMatchSnapshot();
  });
});
