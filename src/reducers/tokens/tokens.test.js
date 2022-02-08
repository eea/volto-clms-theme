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
        items: [],
        loaded: false,
        loading: true,
      },
    });
  });
  //jest test for tokens -fail
  it('should handle GET_TOKENS_FAIL', () => {
    expect(
      tokens(
        {},
        {
          type: `${GET_TOKENS}_FAIL`,
        },
      ),
    ).toEqual({
      get: {
        error: true,
        items: [],
        loaded: false,
        loading: false,
      },
    });
  });
  //jest test for tokens -success
  it('should handle GET_TOKENS_SUCCESS', () => {
    expect(
      tokens(
        {},
        {
          type: `${GET_TOKENS}_SUCCESS`,
          result: {
            tokens: [
              {
                id: 'token-1',
                name: '',
                description: '',
                token: '',
              },
            ],
          },
        },
      ),
    ).toEqual({
      get: {
        error: null,
        loaded: true,
        loading: false,
      },
      data: {
        tokens: [
          {
            id: 'token-1',
            name: '',
            description: '',
            token: '',
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
        items: [],
        loaded: false,
        loading: true,
      },
    });
  });
  //jest test for tokens -fail
  it('should handle CREATE_TOKENS_FAIL', () => {
    expect(
      tokens(
        {},
        {
          type: `${CREATE_TOKENS}_FAIL`,
        },
      ),
    ).toEqual({
      create: {
        error: true,
        items: [],
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
          result: {
            token: {
              id: 'token-1',
              name: '',
              description: '',
              token: '',
            },
          },
        },
      ),
    ).toEqual({
      create: {
        error: null,
        items: [
          {
            id: 'token-1',
            name: '',
            description: '',
            token: '',
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
        items: [],
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
    ).toEqual({
      delete: {
        error: true,
        items: [],
        loaded: false,
        loading: false,
      },
    });
  });
  //jest test for tokens -success
  it('should handle DELETE_TOKENS_SUCCESS', () => {
    expect(
      tokens(
        {},
        {
          type: `${DELETE_TOKENS}_SUCCESS`,
          result: {
            token: {
              id: 'token-1',
              name: '',
              description: '',
              token: '',
            },
          },
        },
      ),
    ).toEqual({
      delete: {
        error: null,
        items: [
          {
            id: 'token-1',
            name: '',
            description: '',
            token: '',
          },
        ],
        loaded: true,
        loading: false,
      },
    });
  });
});
