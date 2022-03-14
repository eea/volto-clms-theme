import { MEETING_SUBSCRIBERS, MeetingSubscribers } from './meeting_subscribers';
import {
  MEETING_SUBSCRIBERS_MANIPULATION,
  MeetingSubscribersManipulation,
} from './meeting_subscribers_manipulation';
import { POST_MEETING_REGISTER, postMeetingRegister } from './meeting_register';

describe('Meeting actions', () => {
  describe('postMeetingRegister', () => {
    it('should create an action to post the meeting', () => {
      const url = 'http://localhost';
      const action = postMeetingRegister(url);

      expect(action.type).toEqual(POST_MEETING_REGISTER);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${url}/@register`);
    });
  });
  describe('MeetingSubscribersManipulation', () => {
    it('should create an action to post subscribers', () => {
      const url = 'http://localhost';
      const action = MeetingSubscribersManipulation(url);

      expect(action.type).toEqual(MEETING_SUBSCRIBERS_MANIPULATION);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${url}/@manipulation`);
    });
  });
  describe('MeetingSubscribers', () => {
    it('should create an action to get the subscribers', () => {
      const url = 'http://localhost';
      const action = MeetingSubscribers(url);

      expect(action.type).toEqual(MEETING_SUBSCRIBERS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `${url}/@search?portal_type=eea.meeting.subscriber&fullobjects=true`,
      );
    });
  });
});
