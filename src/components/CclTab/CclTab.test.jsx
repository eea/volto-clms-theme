import Enzyme, { mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CclTab from './CclTab';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore();

describe('CclTab', () => {
  it('Check if onTabClick function is called when tab is clicked', () => {
    const store = mockStore({
      userSession: {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0NDM4MzA0NCwiZnVsbG5hbWUiOm51bGx9.cB_q3Q0Jhu8h2m_SDmmknodpDxDLfb4o-qY6Y2plE04',
      },
    });
    const onTabClick = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CclTab
            onClick={onTabClick}
            tabTitle="tab title"
            tabContent="tab content"
            redirect={'/'}
          />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find('a').simulate('click');
    expect(onTabClick).toHaveBeenCalled();
  });
  it('Check if tab title is rendered with routing = true', () => {
    const store = mockStore({
      userSession: {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0NDM4MzA0NCwiZnVsbG5hbWUiOm51bGx9.cB_q3Q0Jhu8h2m_SDmmknodpDxDLfb4o-qY6Y2plE04',
      },
    });
    const tabTitle = 'Dataset Info';
    const routing = true;
    const tabView = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CclTab
              tabTitle={tabTitle}
              onClick={() => {
                return 'test';
              }}
              routing={routing}
            >
              <p>Hello test!</p>
            </CclTab>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tabView).toBeDefined();
  });
  it('Check if tab title is rendered with routing = false', () => {
    const store = mockStore({
      userSession: {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY0NDM4MzA0NCwiZnVsbG5hbWUiOm51bGx9.cB_q3Q0Jhu8h2m_SDmmknodpDxDLfb4o-qY6Y2plE04',
      },
    });
    const tabTitle = 'Dataset Info';
    const routing = false;
    const tabView = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <CclTab
              tabTitle={tabTitle}
              onClick={() => {
                return 'test';
              }}
              routing={routing}
            >
              <p>Hello test!</p>
            </CclTab>
          </MemoryRouter>
        </Provider>,
      )
      .toJSON();
    expect(tabView).toBeDefined();
  });
});
