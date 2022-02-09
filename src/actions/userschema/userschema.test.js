import { getUserSchema } from './userschema';
import { GET_USERSCHEMA } from '../../constants/ActionTypes';

describe('User Schema action', () => {
  describe('getUserSchema', () => {
    it('should create an action to get the user schema', () => {
      const action = getUserSchema();

      expect(action.type).toEqual(GET_USERSCHEMA);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@userschema');
    });
  });
});
