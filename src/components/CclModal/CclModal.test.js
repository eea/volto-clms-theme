import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CclModal from './CclModal';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

const mockStore = configureStore();

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables();
});

jest.mock('@eeacms/volto-clms-utils/src/helpers', () => ({
  withFontAwesomeLibs: jest.fn((Component) => Component),
}));

describe('CclModal', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    apierror: {
      message: 'You are not authorized to access this resource',
    },
  });

  it('Check external link', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <CclModal
          trigger={
            <div className="header-lang-icon">
              <i className="ccl-icon-language"></i>
              <span className="header-lang-code">EN</span>
            </div>
          }
        >
          <p>Hello test!</p>
        </CclModal>
      </Provider>,
    );
    expect(asFragment()).toBeDefined();
  });

  it('Check if clicks work', () => {
    const mockCallBack = jest.fn();
    render(
      <Provider store={store}>
        <CclModal
          trigger={
            <a
              href="/login"
              className="header-login-link"
              onClick={mockCallBack}
            >
              Login/Register
            </a>
          }
          size="tiny"
        >
          <p>Hello test!</p>
        </CclModal>
      </Provider>,
    );

    // Simulate click on login link
    const loginLink = screen.getByText('Login/Register');
    fireEvent.click(loginLink);

    // Simulate click and keydown on close button
    const closeModalButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeModalButton);
    fireEvent.keyDown(closeModalButton, { key: 'Enter', code: 'Enter' });

    // Check if callback was called
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
