import { GET_NUTSNAME } from '../../actions';
import { nutsnamesReducer } from './nutsnames_reducer';

//jest test to nutsnamesReducer
describe('nutsnamesReducer', () => {
  it('should return the initial state', () => {
    expect(nutsnamesReducer(undefined)).toEqual({
      error: null,
      loaded: false,
      loading: false,
      nutsnames: {},
    });
  });
  //jest test to nutsnamesReducer -success
  it('should handle GET_NUTSNAME_SUCCESS', () => {
    expect(
      nutsnamesReducer(
        {},
        {
          type: `${GET_NUTSNAME}_SUCCESS`,
        },
      ),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
    });
  });
  //jest test to nutsnamesReducer -fail
  it('should handle GET_NUTSNAME_FAIL', () => {
    const action = {
      type: `${GET_NUTSNAME}_FAIL`,
      error: true,
      loaded: false,
      loading: false,
    };
    expect(nutsnamesReducer({}, action)).toEqual({
      error: true,
      loaded: false,
      loading: false,
    });
  });
  //jest test to nutsnamesReducer -pending
  it('should handle GET_NUTSNAME_PENDING', () => {
    expect(
      nutsnamesReducer(
        {},
        {
          type: `${GET_NUTSNAME}_PENDING`,
          error: null,
          loaded: false,
          loading: true,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });
});
