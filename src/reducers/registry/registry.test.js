import { GET_REGISTRY } from '../../actions';
import { registryReducer } from './registry';

//jest test for registryReducer
describe('registryReducer', () => {
  it('should return the initial state', () => {
    expect(registryReducer(undefined, {})).toEqual({
      error: null,
      loaded: false,
      loading: false,
      records: {},
    });
  });
  //jest test for registryReducer -pending
  it('should handle GET_REGISTRY_PENDING', () => {
    expect(
      registryReducer(
        {},
        {
          type: `${GET_REGISTRY}_PENDING`,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });
  //jest test for registryReducer -fail
  it('should handle GET_REGISTRY_FAIL', () => {
    const action = {
      type: `${GET_REGISTRY}_FAIL`,
      error: 'error',
    };
    expect(registryReducer({}, action)).toEqual({
      error: action.error,
      loaded: false,
      loading: false,
    });
  });
  //jest test for registryReducer -success
  it('should handle GET_REGISTRY_SUCCESS', () => {
    const action = {
      type: `${GET_REGISTRY}_SUCCESS`,
      registry_key: 'registry_key',
      result: {
        records: {
          'registry-1': {
            id: 'registry-1',
            name: 'Registry 1',
            description: 'Registry 1 description',
            owner: 'registry-owner-1',
            owner_email: '',
          },
          'registry-2': {
            id: 'registry-2',
            name: 'Registry 2',
            description: 'Registry 2 description',
            owner: 'registry-owner-2',
            owner_email: '',
          },
        },
      },
    };
    expect(registryReducer({}, action)).toEqual({
      error: null,
      loaded: true,
      loading: false,
      records: {
        [action.registry_key]: action.result,
      },
    });
  });
});
