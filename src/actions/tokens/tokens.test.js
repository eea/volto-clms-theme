import { GET_TOKENS } from './tokens';
import { CREATE_TOKENS } from './tokens';
import { DELETE_TOKENS } from './tokens';
import { getTokens } from './tokens';
import { createTokens } from './tokens';
import { deleteTokens } from './tokens';

describe('Tokens actions', () => {
  describe('getTokens', () => {
    it('should create an action to get tokens', () => {
      const url = 'http://localhost';
      const action = getTokens(url);

      expect(action.type).toEqual(GET_TOKENS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@service-keys`);
    });
  });
  describe('createTokens', () => {
    it('should create an action to post tokens', () => {
      const url = 'http://localhost';
      const action = createTokens(url);

      expect(action.type).toEqual(CREATE_TOKENS);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${url}/@service-keys`);
    });
  });
  describe('deleteTokens', () => {
    it('should create an action to delete tokens', () => {
      const url = 'http://localhost';
      const action = deleteTokens(url);
      const key_id = 'key_id';

      expect(action.type).toEqual(DELETE_TOKENS);
      expect(action.request.op).toEqual('del');
      expect(action.request.path).toEqual(`${url}/@service-keys/${key_id}`);
    });
  });
});
