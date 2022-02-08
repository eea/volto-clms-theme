import {
  POST_SUBSCRIBE_TO,
  subscribeTo,
  unsubscribeTo,
  confirmSubscribeTo,
  confirmUnsubscribeTo,
} from './post_subscription';

describe('Subscription actions', () => {
  describe('subscribeTo', () => {
    it('should create an action to post subscription', () => {
      const type_url = 'newsletter';
      const email = 'newsletter@mail.com';
      const action = subscribeTo(type_url, email);

      expect(action.type).toEqual(POST_SUBSCRIBE_TO);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(
        `/@${type_url}-notification-subscribe`,
      );
      expect(action.request.data).toEqual({ email: email });
    });
  });
  describe('unsubscribeTo', () => {
    it('should create an action to post unsubscribe', () => {
      const email = 'newsletter@mail.com';
      const type_url = 'newsletter';
      const action = unsubscribeTo(type_url, email);

      expect(action.type).toEqual(POST_SUBSCRIBE_TO);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(
        `/@${type_url}-notification-unsubscribe`,
      );
      expect(action.request.data).toEqual({ email: email });
    });
  });
  describe('confirmSubscribeTo', () => {
    it('should create an action to post confirm subscribe', () => {
      const type_url = 'newsletter';
      const id = 'id';
      const action = confirmSubscribeTo(type_url, id);

      expect(action.type).toEqual(POST_SUBSCRIBE_TO);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(
        `/@${type_url}-notification-subscribe-confirm/${id}`,
      );
    });
  });
  describe('confirmUnsubscribeTo', () => {
    it('should create an action to post confirm unsubscribe', () => {
      const type_url = 'type_url';
      const id = 'id';
      const action = confirmUnsubscribeTo(type_url, id);

      expect(action.type).toEqual(POST_SUBSCRIBE_TO);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(
        `/@${type_url}-notification-unsubscribe-confirm/${id}`,
      );
    });
  });
});
