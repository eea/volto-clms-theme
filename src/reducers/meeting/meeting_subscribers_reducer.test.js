import {
  MEETING_SUBSCRIBERS,
  MEETING_SUBSCRIBERS_MANIPULATION,
} from '../../actions';
import { meetingSubscribersReducer } from './meeting_subscribers_reducer';

//jest test to meetingSubscribersReducer
describe('meetingSubscribersReducer', () => {
  it('should return the initial state', () => {
    expect(meetingSubscribersReducer(undefined)).toEqual({
      error: null,
      loaded: false,
      loading: false,
      items: [],
      message: '',
    });
  });
  //jest test to meetingSubscribersReducer -success
  it('should handle MEETING_SUBSCRIBERS_SUCCESS', () => {
    expect(
      meetingSubscribersReducer(
        {},
        {
          type: `${MEETING_SUBSCRIBERS}_SUCCESS`,
          result: {
            items: [
              {
                id: '1',
                name: 'test',
                email: '',
              },
            ],
          },
        },
      ),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      items: [
        {
          id: '1',
          name: 'test',
          email: '',
        },
      ],
      message: '',
    });
  });
  //jest test to meetingSubscribersReducer -fail
  it('should handle MEETING_SUBSCRIBERS_FAIL', () => {
    const action = {
      type: `${MEETING_SUBSCRIBERS}_FAIL`,
      error: true,
      loaded: false,
      loading: false,
    };
    expect(meetingSubscribersReducer({}, action)).toEqual({
      error: true,
      loaded: false,
      loading: false,
      message: '',
    });
  });
  //jest test to meetingSubscribersReducer -pending
  it('should handle MEETING_SUBSCRIBERS_PENDING', () => {
    expect(
      meetingSubscribersReducer(
        {},
        {
          type: `${MEETING_SUBSCRIBERS}_PENDING`,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
      message: '',
    });
  });
  //jest test to meetingSubscribersReducer -manipulation  -success
  it('should handle MEETING_SUBSCRIBERS_MANIPULATION_SUCCESS', () => {
    expect(
      meetingSubscribersReducer(
        {},
        {
          type: `${MEETING_SUBSCRIBERS_MANIPULATION}_SUCCESS`,
          result: {
            message: 'success',
            items: [],
          },
        },
      ),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      items: [],
      message: 'success',
    });
  });
  //jest test to meetingSubscribersReducer -manipulation  -fail
  it('should handle MEETING_SUBSCRIBERS_MANIPULATION_FAIL', () => {
    const action = {
      type: `${MEETING_SUBSCRIBERS_MANIPULATION}_FAIL`,
      result: {
        message: 'error',
      },
      error: true,
    };
    expect(meetingSubscribersReducer({}, action)).toEqual({
      error: true,
      loaded: false,
      loading: false,
      message: 'error' || '',
    });
  });
  it('should handle MEETING_SUBSCRIBERS_MANIPULATION_FAIL without error message', () => {
    const action = {
      type: `${MEETING_SUBSCRIBERS_MANIPULATION}_FAIL`,
      error: true,
      result: {
        message: '',
      },
    };
    expect(meetingSubscribersReducer({}, action)).toEqual({
      error: true,
      loaded: false,
      loading: false,
      message: '',
    });
  });
  //jest test to meetingSubscribersReducer -manipulation  -pending
  it('should handle MEETING_SUBSCRIBERS_MANIPULATION_PENDING', () => {
    expect(
      meetingSubscribersReducer(
        {},
        {
          type: `${MEETING_SUBSCRIBERS_MANIPULATION}_PENDING`,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });
});
// End of file
