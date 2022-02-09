import { newsletterSubscribersReducer } from './get_newsletter_reducer';
import { GET_NEWSLETTER } from '../../actions';

//jest test for newsletterSubscribersReducer
describe('newsletterSubscribersReducer', () => {
  it('should return the initial state', () => {
    expect(newsletterSubscribersReducer(undefined, {})).toEqual({
      error: null,
      loaded: false,
      loading: false,
      items: [],
    });
  });
  //jest test for newsletterSubscribersReducer -pending
  it('should handle GET_NEWSLETTER_PENDING', () => {
    expect(
      newsletterSubscribersReducer(
        {},
        {
          type: `${GET_NEWSLETTER}_PENDING`,
        },
      ),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
      items: [],
    });
  });
  //jest test for newsletterSubscribersReducer -fail
  it('should handle GET_NEWSLETTER_FAIL', () => {
    expect(
      newsletterSubscribersReducer(
        {},
        {
          type: `${GET_NEWSLETTER}_FAIL`,
        },
      ),
    ).toEqual({
      error: true,
      loaded: false,
      loading: false,
      items: [],
    });
  });
  //jest test for newsletterSubscribersReducer -success
  it('should handle GET_NEWSLETTER_SUCCESS', () => {
    expect(
      newsletterSubscribersReducer(
        {},
        {
          type: `${GET_NEWSLETTER}_SUCCESS`,
          result: {
            subscribers: [
              {
                id: 'newsletter-subscriber-1',
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
          id: 'newsletter-subscriber-1',
          email: '',
        },
      ],
    });
  });
});
