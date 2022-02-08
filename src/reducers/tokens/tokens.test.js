import {
  GET_TOKENS,
  CREATE_TOKENS,
  DELETE_TOKENS,
} from '../../constants/ActionTypes';
import tokens from './tokens';

//jest test for tokens
describe('tokens reducer', () => {
  it('should return the initial state', () => {
    expect(tokens(undefined, {})).toEqual({
      get: {
        error: null,
        items: [],
        loaded: false,
        loading: false,
      },
      create: {
        error: null,
        items: [],
        loaded: false,
        loading: false,
      },
      delete: {
        error: null,
        items: [],
        loaded: false,
        loading: false,
      },
    });
  });
  //jest test for tokens -pending
  it('should handle GET_TOKENS_PENDING', () => {
    expect(
      tokens(
        {},
        {
          type: `${GET_TOKENS}_PENDING`,
        },
      ),
    ).toEqual({
      get: {
        error: null,
        loaded: false,
        loading: true,
      },
    });
  });
  //jest test for tokens -fail
  it('should handle GET_TOKENS_FAIL', () => {
    const action = {
      type: `${GET_TOKENS}_FAIL`,
      error: 'error',
    };
    expect(tokens({}, action)).toEqual({
      get: {
        error: action.error,
        tokens: [],
        loaded: false,
        loading: false,
      },
    });
  });
  //jest test for tokens -success
  it('should handle GET_TOKENS_SUCCESS', () => {
    const action = {
      type: `${GET_TOKENS}_SUCCESS`,
      result: {
        items: [
          {
            client_id: 'client_id',
            ip_range: 'ip_range',
            issued: 'issued',
            key_id: 'key_id',
            public_key: 'public_key',
            title: 'title',
            token_uri: 'token_uri',
            user_id: 'user_id',
          },
        ],
      },
    };
    expect(tokens({}, action)).toEqual({
      get: {
        error: null,
        loaded: true,
        loading: false,
        items: [
          {
            client_id: 'client_id',
            ip_range: 'ip_range',
            issued: 'issued',
            key_id: 'key_id',
            public_key: 'public_key',
            title: 'title',
            token_uri: 'token_uri',
            user_id: 'user_id',
          },
        ],
      },
    });
  });
  //jest test for tokens -create
  it('should handle CREATE_TOKENS_PENDING', () => {
    expect(
      tokens(
        {},
        {
          type: `${CREATE_TOKENS}_PENDING`,
        },
      ),
    ).toEqual({
      create: {
        error: null,
        loaded: false,
        loading: true,
      },
    });
  });
  //jest test for tokens -fail
  it('should handle CREATE_TOKENS_FAIL', () => {
    const action = {
      type: `${CREATE_TOKENS}_FAIL`,
      error: 'error',
    };
    expect(tokens({}, action)).toEqual({
      create: {
        error: action.error,
        tokens: [],
        loaded: false,
        loading: false,
      },
    });
  });
  //jest test for tokens -success
  it('should handle CREATE_TOKENS_SUCCESS', () => {
    expect(
      tokens(
        {},
        {
          type: `${CREATE_TOKENS}_SUCCESS`,
          result: [
            {
              client_id: 'client_id',
              ip_range: 'ip_range',
              issued: 'issued',
              key_id: 'key_id',
              private_key: 'private_key',
              title: 'title',
              token_uri: 'token_uri',
              user_id: 'user_id',
            },
          ],
        },
      ),
    ).toEqual({
      create: {
        error: null,
        items: [
          {
            client_id: 'client_id',
            ip_range: 'ip_range',
            issued: 'issued',
            key_id: 'key_id',
            private_key: 'private_key',
            title: 'title',
            token_uri: 'token_uri',
            user_id: 'user_id',
          },
        ],
        loaded: true,
        loading: false,
      },
    });
  });
  //jest test for tokens -delete
  it('should handle DELETE_TOKENS_PENDING', () => {
    expect(
      tokens(
        {},
        {
          type: `${DELETE_TOKENS}_PENDING`,
        },
      ),
    ).toEqual({
      delete: {
        error: null,
        loaded: false,
        loading: true,
      },
    });
  });
  //jest test for tokens -fail
  it('should handle DELETE_TOKENS_FAIL', () => {
    expect(
      tokens(
        {},
        {
          type: `${DELETE_TOKENS}_FAIL`,
        },
      ),
    ).toEqual({});
  });
  //jest test for tokens -success
  it('should handle DELETE_TOKENS_SUCCESS', () => {
    expect(
      tokens(
        {},
        {
          type: `${DELETE_TOKENS}_SUCCESS`,
        },
      ),
    ).toEqual({
      delete: {
        error: null,
        loaded: true,
        loading: false,
      },
    });
  });
});
