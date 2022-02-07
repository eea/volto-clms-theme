import { POST_SUBSCRIBE_TO } from './post_subscription';
import { subscribeTo } from './post_subscription';
import { unsubscribeTo } from './post_subscription';
import { confirmSubscribeTo } from './post_subscription';
import { confirmUnsubscribeTo } from './post_subscription';

describe('Subscription actions', () => {
  describe('subscribeTo', () => {
    it('should create an action to post subscription', () => {
      const url = 'http://localhost';
      const action = subscribeTo(url);
      const type_url = 'type_url';

      expect(action.type).toEqual(POST_SUBSCRIBE_TO);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(
        `${url}/@${type_url}-notification-subscribe`,
      );
    });
  });
  describe('unsubscribeTo', () => {
    it('should create an action to post unsubscribe', () => {
      const url = 'http://localhost';
      const action = unsubscribeTo(url);
      const type_url = 'type_url';

      expect(action.type).toEqual(POST_SUBSCRIBE_TO);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(
        `${url}/@${type_url}-notification-unsubscribe`,
      );
    });
  });
  describe('confirmSubscribeTo', () => {
    it('should create an action to post confirm subscribe', () => {
      const url = 'http://localhost';
      const action = confirmSubscribeTo(url);
      const type_url = 'type_url';
      const id = 'id';

      expect(action.type).toEqual(POST_SUBSCRIBE_TO);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(
        `${url}/@${type_url}-notification-subscribe-confirm/${id}`,
      );
    });
  });
  describe('confirmUnsubscribeTo', () => {
    it('should create an action to post confirm unsubscribe', () => {
      const url = 'http://localhost';
      const action = confirmUnsubscribeTo(url);
      const type_url = 'type_url';
      const id = 'id';

      expect(action.type).toEqual(POST_SUBSCRIBE_TO);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(
        `${url}/@${type_url}-notification-unsubscribe-confirm/${id}`,
      );
    });
  });
});
