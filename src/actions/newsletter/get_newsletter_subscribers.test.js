import { getNewsletterSubscriber } from './get_newsletter_subscribers';
import { GET_NEWSLETTER } from './get_newsletter_subscribers';

describe('Newsletter action', () => {
  describe('getNewsletterSubscriber', () => {
    it('should create an action to get the newsletter subscribers', () => {
      const action = getNewsletterSubscriber();

      expect(action.type).toEqual(GET_NEWSLETTER);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@newsletter-subscribers');
    });
  });
});
