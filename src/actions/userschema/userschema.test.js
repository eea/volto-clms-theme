import { getUserSchema } from './userschema';
import { GET_USERSCHEMA } from './userschema';

describe('User Schema action', () => {
  describe('getUserSchema', () => {
    it('should create an action to get the user schema', () => {
      const url = 'http://localhost';
      const action = getUserSchema(url);

      expect(action.type).toEqual(GET_USERSCHEMA);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@userschema`);
    });
  });
});
