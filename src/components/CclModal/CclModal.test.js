import { render, screen, fireEvent } from '@testing-library/react';
import CclModal from './CclModal';
import { Provider } from 'react-intl-redux';
import React from 'react';
import { createStore } from 'redux';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  intl: (state = { locale: 'en', messages: {} }, action) => state,
  apierror: (
    state = { message: 'You are not authorized to access this resource' },
    action,
  ) => state,
});

const store = createStore(rootReducer);

describe('CclModal', () => {
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

    const loginLink = screen.getByText('Login/Register');
    fireEvent.click(loginLink);

    const closeModalButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeModalButton);
    fireEvent.keyDown(closeModalButton, { key: 'Escape', code: 'Escape' });

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
